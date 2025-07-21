import { Test, TestingModule } from '@nestjs/testing';
import { CustomersService } from './customers.service';
import { NotFoundException } from '@nestjs/common';

describe('CustomersService', () => {
  let service: CustomersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomersService],
    }).compile();

    service = module.get<CustomersService>(CustomersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a customer by ID', async () => {
    const id = 5;
    const customer = await service.findOne(id);
    console.log(customer)
    expect(customer).toBeDefined();
    expect(customer.id).toEqual(id);
  });
  it('should return 404 if customer not found', async () => {
    const id = 9999; // Assuming this ID does not exist
    await expect(service.findOne(id)).rejects.toThrow(NotFoundException);
  });

  it('should return all customers', async () => {
    const customers = await service.findAll();
    expect(customers).toBeDefined();
    expect(Array.isArray(customers)).toBe(true);
  });
  it('should 200 if customer is deleted', async () => {
    const id = 5;
    await expect(service.remove(id)).resolves.toBeUndefined();
  });
});
