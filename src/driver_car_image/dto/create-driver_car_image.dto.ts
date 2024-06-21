import { IsNotEmpty } from 'class-validator';

export class CreateDriverCarImageDto {
  @IsNotEmpty()
  image: string;
  @IsNotEmpty()
  car_id: number;
}
