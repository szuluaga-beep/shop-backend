import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';

@Module({
  controllers: [TransactionsController],
  imports: [
    TypeOrmModule.forFeature([Transaction])
  ],
  providers: [TransactionsService],
})
export class TransactionsModule { }
