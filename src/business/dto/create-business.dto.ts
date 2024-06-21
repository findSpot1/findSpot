import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
export class CreateBusinessDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsOptional()
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  phone: string;
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  location: string;
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  address: string;
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  web_address: string;
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  social_media: string;
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  big_category_id: number;
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  small_category_id: number;
  average_star: number;
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  description: string;
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  extra: string;
  @IsOptional()
  reviews: number;
  @IsOptional()
  likes: number;
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  owner_id: number;
  @IsBoolean()
  is_active: boolean;
  @IsBoolean()
  is_yelp_guaranteed: boolean;
  @IsBoolean()
  is_verified_license: boolean;
   @IsOptional()
  @IsNotEmpty()
  @IsString()
   @ApiProperty({
    example: '55550021****',
    description: "Business's accountNumber",
  })
  accountNumber: string;
}
