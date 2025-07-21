import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private customersRepository: Repository<Customer>,
  ) {}

  async create(createCustomerDto: CreateCustomerDto) {
    // Validate unique email
    const existingCustomer = await this.customersRepository.findOne({
      where: { email: createCustomerDto.email },
    });

    if (existingCustomer) {
      return existingCustomer;
    }
    const customer = this.customersRepository.create(createCustomerDto);
    await this.customersRepository.save(customer);
    return customer;
  }

  async findAll() {
    return await this.customersRepository.find();
  }

  async findOne(id: number) {
    const customer = await this.customersRepository.findOne({ where: { id } });
    if (!customer) {
      throw new NotFoundException(`Customer with id ${id} not found`);
    }
    return customer;
  }

  async findByEmail(email: string) {
    const customer = await this.customersRepository.findOne({
      where: { email },
    });
    if (!customer) {
      throw new NotFoundException(`Customer with email ${email} not found`);
    }
    return customer;
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    const updatedCustomer = await this.customersRepository.preload({
      id,
      ...updateCustomerDto,
    });
    if (!updatedCustomer) {
      throw new NotFoundException(`Customer with id ${id} not found`);
    }
    await this.customersRepository.save(updatedCustomer);
    return updatedCustomer;
  }

  async remove(id: number) {
    const customer = await this.findOne(id);
    await this.customersRepository.remove(customer);
  }
}
