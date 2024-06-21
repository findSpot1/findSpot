import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class LoginAdminDto {
  @IsOptional()
  @IsString()
  name;

  @IsOptional()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;
}
