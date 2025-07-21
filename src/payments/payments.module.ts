import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { TransactionsService } from '../transactions/transactions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from '../transactions/entities/transaction.entity';
import { CustomersService } from '../customers/customers.service';
import { Customer } from '../customers/entities/customer.entity';

@Module({
  controllers: [PaymentsController],
  imports: [TypeOrmModule.forFeature([Transaction, Customer])],
  providers: [PaymentsService, TransactionsService, CustomersService],
})
export class PaymentsModule {}
