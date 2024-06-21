import { PartialType } from '@nestjs/swagger';
import { CreateCommentaryDto } from './create-commentary.dto';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateCommentaryDto extends PartialType(CreateCommentaryDto) {
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  comment: string;
  @IsNumber()
  @IsOptional()
  @IsNotEmpty()
  client_id: number;
  @IsNumber()
  @IsOptional()
  @IsNotEmpty()
  business_id: number;
  commentary_likes: number;
}
