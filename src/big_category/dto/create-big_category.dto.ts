import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateBigCategoryDto {
  @ApiProperty({example: 'BigCategory name', description: 'BigCategory description'})
  @IsString()
  @IsNotEmpty()
  name: string;
  
  @ApiProperty({example: 'BigCategory description', description: 'BigCategory description'})
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description: string;
}
