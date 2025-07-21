import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { ConfigService } from '@nestjs/config';
import { TokenCard } from 'src/common/interfaces/token-card.interface';
import { Aceptation } from 'src/common/interfaces/aceptation-token.interface';
import { PaymentSources } from 'src/common/interfaces/payment-sources.interface';
import { TransactionsService } from 'src/transactions/transactions.service';
import { StatusTransaction } from 'src/common/enums/status-transaction.enum';
import { WompiTransaction } from 'src/common/interfaces/wompi-transaction';

@Injectable()
export class PaymentsService {

  constructor(
    private configService: ConfigService,
    private transactionService: TransactionsService
  ) { }

  async create(createPaymentDto: CreatePaymentDto) {
    const { amountInCents: amounInCents, customerEmail } = createPaymentDto;

    const tokenCard = await this.createTokenCard(createPaymentDto);

    const transaction = await this.transactionService.create({
      amount: amounInCents,
      currency: "COP",
      status: StatusTransaction.PENDING,
    })

    const aceptationTokens = await this.getAceptationTokens();
    const paymentSources = await this.createPaymentSources(
      tokenCard.data.id,
      createPaymentDto.customerEmail,
      aceptationTokens.data.presigned_acceptance.acceptance_token,
      aceptationTokens.data.presigned_personal_data_auth.acceptance_token
    );

    const wompiTransaction = await this.createWompiTransaction(amounInCents, transaction.transactionId,
      paymentSources.data.id, customerEmail
    );

    // Update the transaction with the Wompi transaction ID
    const wompiTransactionStatus = await this.getTransactionById(wompiTransaction.data.id);


    const updatedTransaction = await this.transactionService.update(transaction.id, {
      status: wompiTransactionStatus.data.status === "APPROVED" ? StatusTransaction.COMPLETED : StatusTransaction.FAILED
    });


    return updatedTransaction

  }

  findAll() {
    return `This action returns all payments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} payment`;
  }

  update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return `This action updates a #${id} payment`;
  }

  remove(id: number) {
    return `This action removes a #${id} payment`;
  }

  async createTokenCard(createPaymentDto: CreatePaymentDto) {

    const { creditCardNumber, monthExpiration, yearExpiration, cvc, nameOnCard } = createPaymentDto;

    const response = await fetch(`${this.configService.getOrThrow<string>('API_WOMPI_URL')}/tokens/cards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.getWompiPublicKey()}`
      },
      body: JSON.stringify({

        number: creditCardNumber,
        exp_month: monthExpiration,
        exp_year: yearExpiration,
        cvc,
        card_holder: nameOnCard

      })
    });

    if (!response.ok) {
      throw new InternalServerErrorException(`Error creating token: ${response.statusText}`);
    }
    const data = await response.json() as TokenCard;
    return data;
  }

  async getAceptationTokens() {
    const response = await fetch(`${this.configService.getOrThrow<string>('API_WOMPI_URL')}/merchants/${this.getWompiPublicKey()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    if (!response.ok) {
      throw new InternalServerErrorException(`Error fetching acceptance tokens: ${response.statusText}`);
    }
    const data = await response.json() as Aceptation;
    return data;
  }

  async createPaymentSources(cardToken: string, customerEmail: string,
    acceptanceToken: string, acceptancePersonalAuth: string
  ) {

    const response = await fetch(`${this.configService.getOrThrow<string>('API_WOMPI_URL')}/payment_sources`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.getWompiPrivateKey()}`
      },
      body: JSON.stringify({
        type: 'CARD',
        token: cardToken,
        customer_email: customerEmail,
        acceptance_token: acceptanceToken,
        acceptance_personal_data_auth: acceptancePersonalAuth
      })
    });

    if (!response.ok) {
      throw new InternalServerErrorException(`Error creating payment sources: ${response.statusText}`);
    }
    const data = await response.json() as PaymentSources;
    return data;
  }

  async createWompiTransaction(amountInCents: number, transactionId: string, paymentSourceId: number, customerEmail: string) {

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
    const response = await fetch(`${this.configService.getOrThrow<string>('API_WOMPI_URL')}/transactions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.getWompiPrivateKey()}`
      },
      body: dataJson
    });

    if (!response.ok) {
      throw new InternalServerErrorException(`Error creating Wompi transaction: ${response.statusText}`);
    }
    const data = await response.json() as WompiTransaction;
    return data;
  }

  async getTransactionById(transactionId: string) {
    const response = await fetch(`${this.configService.getOrThrow<string>('API_WOMPI_URL')}/transactions/${transactionId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      throw new InternalServerErrorException(`Error fetching transaction: ${response.statusText}`);
    }
    const data = await response.json() as WompiTransaction;
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
    const hashBuffer = await crypto.subtle.digest("SHA-256", encondedText);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    return hashHex;
  }
}
