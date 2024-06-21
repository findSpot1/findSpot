import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";
import { IsDate } from "sequelize-typescript";

export class CreateOrderDriverDto {
  @IsOptional()
  @IsNotEmpty()
  distance: number;
  @IsOptional()
  @IsNotEmpty()
  get_product_time: Date;
  @IsOptional()
  @IsNotEmpty()
  arrived_product_time: Date;
  @IsOptional()
  @IsNotEmpty()
  duration: string;
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  driver_id: number;
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  order_id: number;
  @IsOptional()
  @IsNotEmpty()
  comment: string;
}
