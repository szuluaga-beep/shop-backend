import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDeliveryDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The address of the delivery',
    example: '123 Main St, Springfield, USA',
  })
  address: string;
}
