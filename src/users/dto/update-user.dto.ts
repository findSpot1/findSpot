import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  full_name: string;

  @IsPhoneNumber('UZ')
  phone: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsString()
  @IsNotEmpty()
  confirm_password: string;

  @IsString()
  social_media: string;

  @IsString()
  card: string;

  @IsString()
  hashed_refresh_token: string;

  @IsBoolean()
  @IsOptional()
  is_businessman: boolean;

  @IsNumber()
  address_id: number;

  @IsString()
  @IsOptional()
  activation_link: string;

  @IsBoolean()
  @IsOptional()
  is_active: boolean;
}
