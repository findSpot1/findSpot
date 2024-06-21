import { PartialType } from '@nestjs/swagger';
import { CreateWorkTimeDto } from './create-work_time.dto';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateWorkTimeDto extends PartialType(CreateWorkTimeDto) {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  Day: string;
  @IsOptional()
  open_hour: string;
  @IsOptional()
  close_hour: string;
  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  business_id: number;
}
