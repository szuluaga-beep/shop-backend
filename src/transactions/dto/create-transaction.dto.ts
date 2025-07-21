import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsNumber, IsPositive, IsString, Matches } from "class-validator";
import { StatusTransaction } from "src/common/enums/status-transaction.enum";

export class CreateTransactionDto {

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    @ApiProperty({
        description: "Amount of the transaction in the smallest currency unit (e.g., cents for USD).",
        example: 1000 // Represents $10.00
    })
    amount: number;

    @IsNotEmpty()
    @IsString()
    @Matches(/^[A-Z]{3}$/, { message: "Currency must be a 3-letter ISO code" })
    @ApiProperty({
        description: "Currency of the transaction, represented as a 3-letter ISO code.",
        example: "USD"
    })
    currency: string;

    @IsNotEmpty()
    @IsEnum(StatusTransaction, { message: "Status must be a valid transaction status" })
    @ApiProperty({
        description: "Status of the transaction.",
        enum: StatusTransaction,
        example: StatusTransaction.PENDING
    })
    status: StatusTransaction
}
