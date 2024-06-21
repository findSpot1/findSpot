import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateAddressDto } from './create-address.dto';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Optional } from '@nestjs/common';

export class UpdateAddressDto extends PartialType(CreateAddressDto) {
  @ApiProperty({ example: 'City name', description: 'City' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  city: string;


  @ApiProperty({ example: 'District name', description: 'District' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  district: string;

  @ApiProperty({ example: 'Street name', description: 'Street' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  street: string;

  @ApiProperty({ example: 1, description: 'Home number' })
  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  home_number: string;
}
