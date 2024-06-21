import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateOrderDto {
  totalPrice: number;
  shipping_price: number;
  total_price: number;
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
  driver_id: number;
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
}
