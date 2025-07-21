import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';

import { CreatePaymentDto } from './dto/create-payment.dto';
import { TokenCard } from '../common/interfaces/token-card.interface';
import { Aceptation } from '../common/interfaces/aceptation-token.interface';
import { PaymentSources } from '../common/interfaces/payment-sources.interface';
import { StatusTransaction } from '../common/enums/status-transaction.enum';
import { WompiTransaction } from '../common/interfaces/wompi-transaction';
import { Transaction } from '../transactions/entities/transaction.entity';
import { Customer } from '../customers/entities/customer.entity';
import { Product } from '../products/entities/product.entity';
import { Delivery } from '../deliveries/entities/delivery.entity';

@Injectable()
export class PaymentsService {
  constructor(
    private configService: ConfigService,
    private dataSource: DataSource,
  ) {}

  async create(createPaymentDto: CreatePaymentDto) {
    const {
      amountInCents: amounInCents,
      customerEmail,
      customerFullName,
      productId,
    } = createPaymentDto;

    const queryRunner = this.dataSource.createQueryRunner();

    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();

      const product = await queryRunner.manager.findOne(Product, {
        where: { id: productId },
      });

      if (!product) {
        throw new NotFoundException(`Product with ID ${productId} not found`);
      }

      if (product.quantity === 0) {
        throw new BadRequestException(
          `Product with ID ${productId} is out of stock`,
        );
      }

      const customer = new Customer();
      customer.email = customerEmail;
      customer.name = customerFullName;

      await queryRunner.manager.save(customer);

      const delivery = new Delivery();
      delivery.address = createPaymentDto.address;

      await queryRunner.manager.save(delivery);

      const transaction = new Transaction();
      transaction.amount = amounInCents;
      transaction.currency = 'COP';
      transaction.status = StatusTransaction.PENDING;
      transaction.customer = customer;
      transaction.transactionId = uuidv4();
      transaction.product = product;
      transaction.delivery = delivery;

      await queryRunner.manager.save(transaction);

      const tokenCard = await this.createTokenCard(createPaymentDto);

      const aceptationTokens = await this.getAceptationTokens();
      const paymentSources = await this.createPaymentSources(
        tokenCard.data.id,
        createPaymentDto.customerEmail,
        aceptationTokens.data.presigned_acceptance.acceptance_token,
        aceptationTokens.data.presigned_personal_data_auth.acceptance_token,
      );

      const wompiTransaction = await this.createWompiTransaction(
        amounInCents,
        transaction.transactionId,
        paymentSources.data.id,
        customerEmail,
      );

      // Update the transaction with the Wompi transaction ID
      const wompiTransactionStatus = await this.getTransactionById(
        wompiTransaction.data.id,
      );

      // Usando el queryRunner para actualizar la transacción con TypeORM
      transaction.status =
        wompiTransactionStatus.data.status === 'APPROVED'
          ? StatusTransaction.COMPLETED
          : StatusTransaction.FAILED;
      const updatedTransaction = await queryRunner.manager.save(transaction);

      // Update the stock or product inventory here if needed

      product.quantity -= 1; // Decrease stock by 1
      await queryRunner.manager.save(product);

      await queryRunner.commitTransaction();
      return updatedTransaction;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new BadRequestException(`Error: ${error}`);
    } finally {
      await queryRunner.release();
    }
  }

  async createTokenCard(createPaymentDto: CreatePaymentDto) {
    const {
      creditCardNumber,
      monthExpiration,
      yearExpiration,
      cvc,
      nameOnCard,
    } = createPaymentDto;

    const response = await fetch(
      `${this.configService.getOrThrow<string>('API_WOMPI_URL')}/tokens/cards`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.getWompiPublicKey()}`,
        },
        body: JSON.stringify({
          number: creditCardNumber,
          exp_month: monthExpiration,
          exp_year: yearExpiration,
          cvc,
          card_holder: nameOnCard,
        }),
      },
    );

    if (!response.ok) {
      throw new InternalServerErrorException(
        `Error creating token: ${response.statusText}`,
      );
    }
    const data = (await response.json()) as TokenCard;
    return data;
  }

  async getAceptationTokens() {
    const response = await fetch(
      `${this.configService.getOrThrow<string>('API_WOMPI_URL')}/merchants/${this.getWompiPublicKey()}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    if (!response.ok) {
      throw new InternalServerErrorException(
        `Error fetching acceptance tokens: ${response.statusText}`,
      );
    }
    const data = (await response.json()) as Aceptation;
    return data;
  }

  async createPaymentSources(
    cardToken: string,
    customerEmail: string,
    acceptanceToken: string,
    acceptancePersonalAuth: string,
  ) {
    const response = await fetch(
      `${this.configService.getOrThrow<string>('API_WOMPI_URL')}/payment_sources`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.getWompiPrivateKey()}`,
        },
        body: JSON.stringify({
          type: 'CARD',
          token: cardToken,
          customer_email: customerEmail,
          acceptance_token: acceptanceToken,
          acceptance_personal_data_auth: acceptancePersonalAuth,
        }),
      },
    );

    if (!response.ok) {
      throw new InternalServerErrorException(
        `Error creating payment sources: ${response.statusText}`,
      );
    }
    const data = (await response.json()) as PaymentSources;
    return data;
  }

  async createWompiTransaction(
    amountInCents: number,
    transactionId: string,
    paymentSourceId: number,
    customerEmail: string,
  ) {
    const dataJson = JSON.stringify({
      amount_in_cents: amountInCents,
      currency: 'COP',
      signature: await this.encrypt(transactionId, amountInCents),
      customer_email: customerEmail,
      payment_method: {
        installments: 1,
      },
      reference: transactionId,
      payment_source_id: paymentSourceId,
    });
    const response = await fetch(
      `${this.configService.getOrThrow<string>('API_WOMPI_URL')}/transactions`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.getWompiPrivateKey()}`,
        },
        body: dataJson,
      },
    );

    if (!response.ok) {
      throw new InternalServerErrorException(
        `Error creating Wompi transaction: ${response.statusText}`,
      );
    }
    const data = (await response.json()) as WompiTransaction;
    return data;
  }

  async getTransactionById(transactionId: string) {
    const response = await fetch(
      `${this.configService.getOrThrow<string>('API_WOMPI_URL')}/transactions/${transactionId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.ok) {
      throw new InternalServerErrorException(
        `Error fetching transaction: ${response.statusText}`,
      );
    }
    const data = (await response.json()) as WompiTransaction;
    return data;
  }

  getWompiPublicKey(): string {
    return `${this.configService.getOrThrow<string>('WOMPI_PUBLIC_KEY')}`;
  }

  getWompiPrivateKey(): string {
    return `${this.configService.getOrThrow<string>('WOMPI_PRIVATE_KEY')}`;
  }

  getWompiIntegrityKey(): string {
    return `${this.configService.getOrThrow<string>('WOMPI_INTEGRITY_KEY')}`;
  }

  async encrypt(transactionId: string, amountInCents: number) {
    const cadenaConcatenada = `${transactionId}${amountInCents}COP${this.getWompiIntegrityKey()}`;

    const encondedText = new TextEncoder().encode(cadenaConcatenada);
    const hashBuffer = await crypto.subtle.digest('SHA-256', encondedText);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
    return hashHex;
  }
}
