import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Name of the product' })
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @ApiProperty({ type: Number, description: 'Price of the product' })
  price: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'Description of the product' })
  description: string;

  @IsString()
  @IsNotEmpty()
  @IsUrl()
  @ApiProperty({
    description: 'Image URL of the product',
    example: 'https://example.com/image.jpg',
  })
  imageUrl: string;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  @ApiProperty({ description: 'Quantity of the product' })
  quantity: number;
}
