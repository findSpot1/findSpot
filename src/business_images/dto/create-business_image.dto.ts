import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateBusinessImageDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  image: string;
  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  business_id: number;
  is_main_image: boolean;
  is_active: boolean;
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  image_comment: string;
}
