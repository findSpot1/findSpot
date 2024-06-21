import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateBigCategoryDto } from './create-big_category.dto';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateBigCategoryDto extends PartialType(CreateBigCategoryDto) {
  @ApiProperty({
    example: 'Restaurants',
    description: 'BigCategory name should be here',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'You can find resources here',
    description: 'BigCategory description',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description: string;
}
