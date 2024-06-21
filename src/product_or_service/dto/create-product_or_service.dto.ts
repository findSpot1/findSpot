import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateProductOrServiceDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsOptional()
  @IsNotEmpty()
  price: number;
  @IsOptional()
  @IsBoolean()
  is_available_onlineOrders: boolean;
  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  business_id: number;
  @IsOptional()
  @IsNumber()
  quantity_of_selling: number;
  @IsOptional()
  @IsNotEmpty()
  image: string;
}
