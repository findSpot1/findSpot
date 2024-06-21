import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCartDto {
  @IsNotEmpty()
  @IsNumber()
  client_id: number;
  business_id: number;
  totalPrice: number;
  status: 'active' | 'completed' | 'converted';
}
