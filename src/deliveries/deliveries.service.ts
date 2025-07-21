import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';
import { Repository } from 'typeorm';
import { Delivery } from './entities/delivery.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DeliveriesService {
  constructor(
    @InjectRepository(Delivery)
    private deliveriesRepository: Repository<Delivery>
  ) { }

  async create(createDeliveryDto: CreateDeliveryDto) {
    const delivery = this.deliveriesRepository.create(createDeliveryDto);
    await this.deliveriesRepository.save(delivery);
    return delivery;
  }

  async findAll() {
    return this.deliveriesRepository.find();
  }

  async findOne(id: number) {
    const delivery = await this.deliveriesRepository.findOne({ where: { id } });
    if (!delivery) {
      throw new NotFoundException(`Delivery with ID ${id} not found`);
    }
    return delivery;
  }

  async update(id: number, updateDeliveryDto: UpdateDeliveryDto) {

    const deliveryUpdated = await this.deliveriesRepository.preload({
      id,
      ...updateDeliveryDto,
    });
    if (!deliveryUpdated) {
      throw new NotFoundException(`Delivery with ID ${id} not found`);
    }
    await this.deliveriesRepository.save(deliveryUpdated);
    return deliveryUpdated;
  }

  async remove(id: number) {
    const delivery = await this.findOne(id);
    await this.deliveriesRepository.remove(delivery);
    return delivery;
  }
}
