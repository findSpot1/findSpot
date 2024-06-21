import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class CreateOrderItemDto {
  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  order_id: number;
  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  product_id: number;
  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  quantity: number;
  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  totalPrice: number;
}
