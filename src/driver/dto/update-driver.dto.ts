import { PartialType } from '@nestjs/swagger';
import { CreateDriverDto } from './create-driver.dto';

export class UpdateDriverDto extends PartialType(CreateDriverDto) {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone: string;
  passportID: string;
  card_number: string;
  refresh_token: string;
}
