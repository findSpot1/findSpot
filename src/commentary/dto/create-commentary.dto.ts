import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCommentaryDto {
  @IsNotEmpty()
  @IsString()
  comment: string;
  @IsNumber()
  @IsNotEmpty()
  client_id: number;
  @IsNumber()
  @IsNotEmpty()
  business_id: number;
  commentary_likes: number;
}
