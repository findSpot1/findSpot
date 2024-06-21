import { PartialType } from '@nestjs/swagger';
import { CreateDriverCarDto } from './create-driver_car.dto';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateDriverCarDto extends PartialType(CreateDriverCarDto) {
  @IsOptional()
  @IsString()
  model: string;
  @IsOptional()
  @IsString()
  number: string;
  @IsOptional()
  @IsNumber()
  driver_id: number;
}
