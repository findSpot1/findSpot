import { PartialType } from '@nestjs/swagger';
import { CreateStarDto } from './create-star.dto';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class UpdateStarDto extends PartialType(CreateStarDto) {
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  client_id: number;
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  business_id: number;
  @IsNotEmpty()
  @IsOptional()
  star: number;
}
