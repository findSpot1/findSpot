import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProductOrServiceService } from './product_or_service.service';
import { CreateProductOrServiceDto } from './dto/create-product_or_service.dto';
import { UpdateProductOrServiceDto } from './dto/update-product_or_service.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductOrService } from './models/product_or_service.model';
import { JwtAdminGuard } from '../common/guards/admin-auth.guard';
import { UserGuard } from '../common/guards/user.guard';

@ApiTags('Product-or-service')
@Controller('product-or-service')
export class ProductOrServiceController {
  constructor(
    private readonly productOrServiceService: ProductOrServiceService,
  ) {}

  // @UseGuards(JwtAdminGuard)
  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({ status: 200, type: ProductOrService })
  @Post()
  async createProduct(
    @Body() createProductOrServiceDto: CreateProductOrServiceDto,
  ) {
    try {
      return this.productOrServiceService.create(createProductOrServiceDto);
    } catch (error) {
      throw error;
    }
  }

  // @UseGuards(JwtAdminGuard)
  @ApiOperation({ summary: 'Get all product' })
  @ApiResponse({ status: 200, type: [ProductOrService] })
  @Get()
  async findAllProduct() {
    try {
      return this.productOrServiceService.findAll();
    } catch (error) {
      throw error;
    }
  }

  @ApiOperation({ summary: 'Get product by id' })
  @ApiResponse({ status: 200, type: ProductOrService })
  @Get(':id')
  async findOneProduct(@Param('id') id: string) {
    try {
      return this.productOrServiceService.findOne(+id);
    } catch (error) {
      throw error;
    }
  }

  @ApiOperation({ summary: 'Get product by name' })
  @ApiResponse({ status: 200, type: ProductOrService })
  @Get(':name')
  async findProductByName(@Param('name') name: string) {
    try {
      return this.productOrServiceService.findProductByName(name);
    } catch (error) {
      throw error;
    }
  }

  @ApiOperation({ summary: 'Get product by price' })
  @ApiResponse({ status: 200, type: [ProductOrService] })
  @Get(':price')
  async findProductByPrice(@Param('price') price: number) {
    try {
      return this.productOrServiceService.findProductByPrice(price);
    } catch (error) {
      throw error;
    }
  }

  @ApiOperation({ summary: 'Get products by most selling' })
  @ApiResponse({ status: 200, type: [ProductOrService] })
  @Get('trends/product')
  async mostSelling() {
    try {
      return this.productOrServiceService.findProductByAmountSelling();
    } catch (error) {
      throw error;
    }
  }

  // @UseGuards(UserGuard)
  @ApiOperation({ summary: 'Update product by id' })
  @ApiResponse({ status: 200, type: ProductOrService })
  @Patch(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body() updateProductOrServiceDto: UpdateProductOrServiceDto,
  ) {
    try {
      return this.productOrServiceService.update(
        +id,
        updateProductOrServiceDto,
      );
    } catch (error) {
      throw error;
    }
  }

  // @UseGuards(JwtAdminGuard)
  @ApiOperation({ summary: 'Delete product by id' })
  @ApiResponse({ status: 200, type: Number })
  @Delete(':id')
  async removeProduct(@Param('id') id: string) {
    try {
      return this.productOrServiceService.remove(+id);
    } catch (error) {
      throw error;
    }
  }
}
