import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { TransactionsService } from 'src/transactions/transactions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from 'src/transactions/entities/transaction.entity';

@Module({
  controllers: [PaymentsController],
  imports: [TypeOrmModule.forFeature([Transaction])],
  providers: [PaymentsService, TransactionsService],
})
export class PaymentsModule { }
