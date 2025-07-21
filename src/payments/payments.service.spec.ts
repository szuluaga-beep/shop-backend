import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { NotFoundException } from '@nestjs/common';

describe('PaymentsService', () => {
  let service: PaymentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentsService],
    }).compile();

    service = module.get<PaymentsService>(PaymentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('shloud return not found when product not found', async () => {
    const createPayment: CreatePaymentDto = {
      amountInCents: 10000000,
      customerEmail: 'steven@yopmail.com',
      customerFullName: 'Steven',
      productId: 999, // Assuming this ID does not exist
      address: '123 Main St',
      creditCardNumber: '42424242424242',
      monthExpiration: '12',
      yearExpiration: '25',
      cvc: '123',
      nameOnCard: 'Steven',
    }
    await expect(service.create(createPayment)).rejects.toThrow(NotFoundException);
  });
  it('should return a transaction when payment is successful', async () => {
    const createPayment: CreatePaymentDto = {
      amountInCents: 1000000,
      customerEmail: 'steven@yopmail.com',
      customerFullName: 'Steven',
      productId: 1,
      address: '123 Main St',
      creditCardNumber: '42424242424242',
      monthExpiration: '12',
      yearExpiration: '25',
      cvc: '123',
      nameOnCard: 'Steven',
    };
    const result = await service.create(createPayment);
    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('status', 'COMPLETED');
    expect(result).toHaveProperty('amountInCents', createPayment.amountInCents);
    expect(result).toHaveProperty('customer');
    expect(result.customer).toHaveProperty('email', createPayment.customerEmail);
    expect(result.customer).toHaveProperty('name', createPayment.customerFullName);

  });
  it('should throw an error when payment fails', async () => {
    const createPayment: CreatePaymentDto = {
      amountInCents: 1000000,
      customerEmail: 'steven@yopmail.com',
      customerFullName: 'Steven',
      productId: 1,
      address: '123 Main St',
      creditCardNumber: '42424242424242',
      monthExpiration: '12',
      yearExpiration: '25',
      cvc: '123',
      nameOnCard: 'Steven',
    };
    const result = await service.create(createPayment);
    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('status', 'COMPLETED');
    expect(result).toHaveProperty('amountInCents', createPayment.amountInCents);
    expect(result).toHaveProperty('customer');
    expect(result.customer).toHaveProperty('email', createPayment.customerEmail);
    expect(result.customer).toHaveProperty('name', createPayment.customerFullName);

  });
  it('should throw an error when payment fails', async () => {
    const createPayment: CreatePaymentDto = {
      amountInCents: 1000000,
      customerEmail: 'steven@yopmail.com',
      customerFullName: 'Steven',
      productId: 1,
      address: '123 Main St',
      creditCardNumber: '42424242424242',
      monthExpiration: '12',
      yearExpiration: '25',
      cvc: '123',
      nameOnCard: 'Steven',
    };
    await expect(service.create(createPayment)).rejects.toThrow(Error);
  });

});