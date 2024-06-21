import { PartialType } from '@nestjs/swagger';
import { CreateCartDto } from './create-cart.dto';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class UpdateCartDto extends PartialType(CreateCartDto) {
  client_id?: number;
  business_id?: number;
  totalPrice?: number;
  status?: 'active' | 'completed' | 'converted';
}
