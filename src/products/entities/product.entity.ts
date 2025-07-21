import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Transaction } from '../../transactions/entities/transaction.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('decimal')
  price: number;

  @Column()
  description: string;

  @Column({
    name: 'image_url',
  })
  imageUrl: string;

  @Column()
  quantity: number;

  @OneToMany(() => Transaction, (transaction) => transaction.product)
  transactions: Transaction[];
}
