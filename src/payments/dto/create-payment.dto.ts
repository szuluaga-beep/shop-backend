import { ApiProperty } from '@nestjs/swagger';
import {
  IsCreditCard,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';

export class CreatePaymentDto {
  @IsCreditCard()
  @IsString()
  @IsNotEmpty()
  @Matches(
    /^(4[0-9]{12}(?:[0-9]{3})?|(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12})$/,
    {
      message: 'Credit card number must be a valid Visa or MasterCard number.',
    },
  )
  @ApiProperty({
    description:
      'Credit card number must be a valid Visa or MasterCard number.',
    example: '4111111111111111',
  })
  creditCardNumber: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(2)
  @Matches(/^(0[1-9]|1[0-2])$/, {
    message: 'Month must be a valid two-digit number (01-12).',
  })
  @ApiProperty({
    description: 'Month must be a valid two-digit number (01-12).',
    example: '12',
  })
  monthExpiration: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(2)
  @Matches(/^(0[0-9]|[1-9][0-9])$/, {
    message: 'Year must be a valid two-digit number (00-99).',
  })
  @ApiProperty({
    description: 'Year must be a valid two-digit number (00-99).',
    example: '25',
  })
  yearExpiration: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(3)
  @Matches(/^[0-9]{3}$/, {
    message: 'CVV must be a 3-digit number.',
  })
  @ApiProperty({
    description: 'CVC must be a 3-digit number.',
    example: '123',
  })
  cvc: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Name on the credit card.',
    example: 'John Doe',
  })
  nameOnCard: string;

  @IsNumber()
  @IsInt()
  @IsPositive()
  @ApiProperty({
    description: 'Product ID associated with the payment.',
    example: 123,
  })
  productId: number;

  @IsNumber()
  @IsNumber()
  @IsPositive()
  @ApiProperty({
    description: 'Amount in cents to be charged.',
    example: 5000,
  })
  amountInCents: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Full name of the customer.',
    example: 'John Doe',
  })
  customerFullName: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    description: 'Email address of the customer.',
    example: 'john.doe@example.com',
  })
  customerEmail: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Billing address of the customer.',
    example: '123 Main St, Anytown, USA',
  })
  address: string;
}
