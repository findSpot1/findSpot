import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";

export class CreateAddressDto {
  @ApiProperty({ example: 'City name', description: 'City' })
  @IsString()
  @IsNotEmpty()
  city: string;
  @ApiProperty({ example: 'District name', description: 'District' })
  @IsString()
  @IsNotEmpty()
  district: string;
  @ApiProperty({ example: 'Street name', description: 'Street' })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  street: string;
  @ApiProperty({ example: 1, description: 'Home number' })
  @IsNumber()
  @IsNotEmpty()
  home_number: string;
}
