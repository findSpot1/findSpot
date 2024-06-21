import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateAdminDto } from './create-admin.dto';
import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';


export class UpdateAdminDto extends PartialType(CreateAdminDto) {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'adminName',
    description: 'Name of the admin',
  })
  name: string;
  @ApiProperty({
    example: 'admin',
    description: 'Login of the admin',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @ApiProperty({
    example: '90092****',
    description: 'Phone_number of the admin',
  })
  phone: string;
  @ApiProperty({
    example: 'AD0172143',
    description: 'PassportID of the admin',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  passportID: string;
  @ApiProperty({
    example: 'admin_photo',
    description: 'Photo of the admin',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  admin_photo: string;
  @ApiProperty({
    example: 'example0403',
    description: 'Hashed password of the admin',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  hashed_password: string;
  @ApiProperty({
    example: 'example0403',
    description: 'Confirm password of the admin',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  confirm_password: string;
  @ApiProperty({
    example: 'telegram_link',
    description: 'Telegram link of the admin',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  telegram_link: string;
  @ApiProperty({
    example: 'is_active',
    description: 'Is active of the admin',
  })
  @IsOptional()
  @IsBoolean()
  @IsNotEmpty()
  is_active: boolean;
  @ApiProperty({
    example: 'is_creater',
    description: 'Is creater of the admin',
  })
  @IsOptional()
  @IsBoolean()
  @IsNotEmpty()
  is_creater: boolean;
  @ApiProperty({
    example: 'hashed_refresh_token',
    description: 'Hashed refresh token of the admin',
  })
  @IsOptional()
  @IsString()
  hashed_refresh_token: string;
}
