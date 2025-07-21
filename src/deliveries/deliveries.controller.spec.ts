import { Test, TestingModule } from '@nestjs/testing';
import { DeliveriesController } from './deliveries.controller';
import { DeliveriesService } from './deliveries.service';
import { NotFoundException } from '@nestjs/common';

describe('DeliveriesController', () => {
  let controller: DeliveriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeliveriesController],
      providers: [DeliveriesService],
    }).compile();

    controller = module.get<DeliveriesController>(DeliveriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should return all deliveries', async () => {
    const result = await controller.findAll();
    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
  });
  it('should have called the service with correct parameters', async () => {
    const findAllSpy = jest.spyOn(controller, 'findAll');
    await controller.findAll();
    expect(findAllSpy).toHaveBeenCalled();
  });
  it('should return a delivery by ID', async () => {
    const deliveryId = 123;
    const result = await controller.findOne(deliveryId);
    expect(result).toBeDefined();
    expect(result.id).toEqual(deliveryId);
  });
  it('should throw an error if delivery not found', async () => {
    const deliveryId = 999; // Assuming this ID does not exist
    await expect(controller.findOne(deliveryId)).rejects.toThrow(NotFoundException);
  });
  it('should create a new delivery', async () => {
    const createDeliveryDto = { id: 456, address: '123 Main St' };
    const result = await controller.create(createDeliveryDto);
    expect(result).toBeDefined();
    expect(result.id).toEqual(createDeliveryDto.id);
    expect(result.address).toEqual(createDeliveryDto.address);
  });
  it('should update an existing delivery', async () => {
    const deliveryId = 123;
    const updateData = { address: '456 Elm St' };
    const result = await controller.update(deliveryId, updateData);
    expect(result).toBeDefined();
    expect(result.id).toEqual(deliveryId);
    expect(result.address).toEqual(updateData.address);
  });
  it('should throw an error when trying to update a non-existing delivery', async () => {
    const deliveryId = 999; // Assuming this ID does not exist
    const updateData = { address: '456 Elm St' };
    await expect(controller.update(deliveryId, updateData)).rejects.toThrow(NotFoundException);
  });
  it('should remove a delivery by ID', async () => {
    const deliveryId = 123;
    const result = await controller.remove(deliveryId);
    expect(result).toBeUndefined();
  });

});
