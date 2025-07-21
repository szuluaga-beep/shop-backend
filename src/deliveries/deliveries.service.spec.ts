import { Test, TestingModule } from '@nestjs/testing';
import { DeliveriesService } from './deliveries.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('DeliveriesService', () => {
  let service: DeliveriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeliveriesService],
    }).compile();

    service = module.get<DeliveriesService>(DeliveriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Add more tests here for specific methods in DeliveriesService
  it('should return a delivery by ID', async () => {
    const deliveryId = 123;
    const delivery = await service.findOne(deliveryId);
    expect(delivery).toBeDefined();
    expect(delivery.id).toEqual(deliveryId);
  });
  it('should throw an error if delivery not found', async () => {
    const deliveryId = 999; // Assuming this ID does not exist
    await expect(service.findOne(deliveryId)).rejects.toThrow(NotFoundException);

  });
  it('should return all deliveries', async () => {
    const deliveries = await service.findAll();
    expect(deliveries).toBeDefined();
    expect(Array.isArray(deliveries)).toBe(true);
  });
  it('should remove a delivery by ID', async () => {
    const deliveryId = 123;
    await service.remove(deliveryId);
    const delivery = await service.findOne(deliveryId);
    expect(delivery).toBeNull();
  });

  it('should create a new delivery', async () => {
    const newDelivery = { id: 456, address: '123 Main St' };
    const createdDelivery = await service.create(newDelivery);
    expect(createdDelivery).toBeDefined();
    expect(createdDelivery.id).toEqual(newDelivery.id);
    expect(createdDelivery.address).toEqual(newDelivery.address);
  });
  it('should update an existing delivery', async () => {
    const deliveryId = 123;
    const updateData = { address: '456 Elm St' };
    const updatedDelivery = await service.update(deliveryId, updateData);
    expect(updatedDelivery).toBeDefined();
    expect(updatedDelivery.id).toEqual(deliveryId);
    expect(updatedDelivery.address).toEqual(updateData.address);
  });
  it('should throw an error when trying to update a non-existing delivery', async () => {
    const deliveryId = 999; // Assuming this ID does not exist
    const updateData = { address: '456 Elm St' };
    await expect(service.update(deliveryId, updateData)).rejects.toThrow(NotFoundException);
  });
  it('should return not found when trying to remove a non-existing delivery', async () => {
    const deliveryId = 999; // Assuming this ID does not exist
    await expect(service.remove(deliveryId)).rejects.toThrow(NotFoundException);
  });
  it('should throw an error when trying to create a delivery with invalid data', async () => {
    const invalidDelivery = { id: null, address: '' }; // Invalid data
    await expect(service.create(invalidDelivery)).rejects.toThrow(BadRequestException);
  });
});
