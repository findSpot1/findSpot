import { PartialType } from '@nestjs/swagger';
import { CreateProductOrServiceDto } from './create-product_or_service.dto';

export class UpdateProductOrServiceDto extends PartialType(
  CreateProductOrServiceDto,
) {}
