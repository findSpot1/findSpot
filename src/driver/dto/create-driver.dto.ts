import { IsEmail, IsMimeType, IsNotEmpty, IsString, Length, MinLength } from "class-validator";

export class CreateDriverDto {
  @IsNotEmpty()
  @IsString()
  first_name: string;
  @IsNotEmpty()
  @IsString()
  last_name: string;
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @MinLength(6)
  password: string;
  @IsNotEmpty()
  @IsString()
  phone: string;
  @IsNotEmpty()
  @IsString()
  passportID: string;
  @IsNotEmpty()
  @Length(12)
  card_number: string;
  refresh_token: string;
}
