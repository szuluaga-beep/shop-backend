import { StatusTransaction } from "src/common/enums/status-transaction.enum";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("transactions")
export class Transaction {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "numeric",
        precision: 10,

    })
    amount: number;

    @Column({
        name: "transaction_id",
        unique: true,
    })
    transactionId: string;

    @Column()
    currency: string;

    @Column({
        type: "enum",
        enum: StatusTransaction,
        default: StatusTransaction.PENDING
    })
    status: StatusTransaction;

    @CreateDateColumn({
        name: "created_at",
    })
    createdAt: Date;

    @UpdateDateColumn({
        name: "updated_at",
    })
    updatedAt: Date;
}
