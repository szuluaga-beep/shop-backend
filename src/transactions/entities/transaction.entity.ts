import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { StatusTransaction } from '../../common/enums/status-transaction.enum';
import { Customer } from '../../customers/entities/customer.entity';
import { Delivery } from '../../deliveries/entities/delivery.entity';
import { Product } from '../../products/entities/product.entity';

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'numeric',
    precision: 10,
  })
  amount: number;

  @Column({
    name: 'transaction_id',
    unique: true,
  })
  transactionId: string;

  @Column()
  currency: string;

  @Column({
    type: 'enum',
    enum: StatusTransaction,
    default: StatusTransaction.PENDING,
  })
  status: StatusTransaction;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;

  @ManyToOne(() => Customer, (customer) => customer.transactions)
  customer: Customer;

  @ManyToOne(() => Product, (product) => product.transactions)
  product: Product;

  @ManyToOne(() => Delivery, (delivery) => delivery.transactions)
  delivery: Delivery;
}
