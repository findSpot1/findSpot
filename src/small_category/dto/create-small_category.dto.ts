import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";

export class CreateSmallCategoryDto {
  @ApiProperty({
    example: 'Small_category name',
    description: 'Small_category name',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name: string;
  @IsNumber()
  @ApiProperty({ example: 1, description: 'Big_category ID' })
  big_category_id: number;
  @ApiProperty({
    example: 'Description1',
    description: 'Small_category description',
  })
  @IsString()
  description: string;
}
