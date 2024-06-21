import { PartialType } from '@nestjs/swagger';
import { CreateDriverCarImageDto } from './create-driver_car_image.dto';

export class UpdateDriverCarImageDto extends PartialType(CreateDriverCarImageDto) {
  image: string;
  car_id: number;
}
