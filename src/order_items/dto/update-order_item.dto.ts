import { PartialType } from '@nestjs/swagger';
import { CreateOrderItemDto } from './create-order_item.dto';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class UpdateOrderItemDto extends PartialType(CreateOrderItemDto) {
  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  order_id?: number;
  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  product_id?: number;
  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  quantity?: number;
  @IsOptional()
  @IsNumber()
  totalPrice?: number;
}
