import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';

@Module({
  controllers: [CustomersController],
  imports: [TypeOrmModule.forFeature([Customer])],
  providers: [CustomersService],
})
export class CustomersModule {}
