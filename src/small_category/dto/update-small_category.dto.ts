import { PartialType } from '@nestjs/swagger';
import { CreateSmallCategoryDto } from './create-small_category.dto';
import { IsNumber, IsString } from 'class-validator';

export class UpdateSmallCategoryDto extends PartialType(CreateSmallCategoryDto) {
  @IsString()
  name: string;
  @IsNumber()
  big_category_id: number;
  @IsString()
  description: string;
}
