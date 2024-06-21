import { PartialType } from '@nestjs/swagger';
import { CreateBusinessImageDto } from './create-business_image.dto';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateBusinessImageDto extends PartialType(CreateBusinessImageDto) {
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
