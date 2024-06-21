  import { PartialType } from '@nestjs/swagger';
import { CreateOrderDto } from './create-order.dto';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  @IsOptional()
  totalPrice?: number;
  @IsOptional()
  shipping_price?: number;
  @IsOptional()
  total_price?: number;
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  client_id: number;
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  business_id: number;
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  cart_id: number;
  payment_type: 'cash' | 'card';
  status:
    | 'pending'
    | 'processing'
    | 'shipped'
    | 'delivered'
    | 'cancelled'
    | 'refunded';
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  comment: string;
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  driver_id: number;
}
