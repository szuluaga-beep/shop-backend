import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { NotFoundException } from '@nestjs/common';

describe('TransactionsController', () => {
  let controller: TransactionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionsController],
      providers: [TransactionsService],
    }).compile();

    controller = module.get<TransactionsController>(TransactionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should return all transactions', async () => {
    const result = await controller.findAll();
    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
  });
  it('should return a transaction by ID', async () => {
    const transactionId = 123;
    const result = await controller.findOne(transactionId);
    expect(result).toBeDefined();
    expect(result.id).toEqual(transactionId);
  });
  it('should throw an error if transaction not found', async () => {
    const transactionId = 999; // Assuming this ID does not exist
    await expect(controller.findOne(transactionId)).rejects.toThrow(NotFoundException);
  });
  
});
