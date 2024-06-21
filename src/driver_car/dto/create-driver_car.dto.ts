import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateDriverCarDto {
  @IsNotEmpty()
  @IsString()
  model: string;
  @IsNotEmpty()
  @IsString()
  number: string;
  @IsNumber()
  driver_id: number;
}
