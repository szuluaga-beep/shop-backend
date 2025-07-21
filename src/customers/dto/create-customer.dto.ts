import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  @ApiProperty({
    description: 'Name of the customer',
    example: 'John Doe',
  })
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Email of the customer',
    example: 'john.doe@example.com',
  })
  @IsEmail()
  email: string;
}
