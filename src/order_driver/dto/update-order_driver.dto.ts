import { PartialType } from '@nestjs/swagger';
import { CreateOrderDriverDto } from './create-order_driver.dto';

export class UpdateOrderDriverDto extends PartialType(CreateOrderDriverDto) {
  distance: number;
  get_product_time: Date;
  arrived_product_time: Date;
  duration: string;
  driver_id: number;
  order_id: number;
  comment: string;
}
