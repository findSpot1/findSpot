import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Cart } from './model/cart.model';

@ApiTags('Cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @ApiOperation({ summary: 'Create a new Cart' })
  @ApiResponse({ status: 200, type: Cart })
  @Post()
  async createCart(@Body() createCartDto: CreateCartDto) {
    try {
      return this.cartService.createCart(createCartDto);
    } catch (error) {
      throw error.message;
    }
  }

  @ApiOperation({ summary: 'Get all Cart' })
  @ApiResponse({ status: 200, type: [Cart] })
  @Get()
  async findAllCart() {
    try {
      return this.cartService.findAllCart();
    } catch (error) {
      throw error.message;
    }
  }
  @ApiOperation({ summary: 'Get Cart by id' })
  @ApiResponse({ status: 200, type: Cart })
  @Get(':id')
  async findCartByID(@Param('id') id: string) {
    try {
      return this.cartService.findCartByID(+id);
    } catch (error) {
      throw error.message;
    }
  }

  @ApiOperation({ summary: 'Get Cart by clientID' })
  @ApiResponse({ status: 200, type: Cart })
  @Get(':id')
  async findCartByClientID(@Param('id') id: string) {
    try {
      return this.cartService.findOneByClientID(+id);
    } catch (error) {
      throw error.message;
    }
  }
  @ApiOperation({ summary: 'Update Cart by ID' })
  @ApiResponse({ status: 200, type: Cart })
  @Patch(':id')
  async updateCartByID(
    @Param('id') id: string,
    @Body() updateCartDto: UpdateCartDto,
  ) {
    try {
      return this.cartService.updateCartByID(+id, updateCartDto);
    } catch (error) {
      throw error.message;
    }
  }


  @ApiOperation({ summary: 'Delete Cart by ID' })
  @ApiResponse({ status: 200, type: Number })
  @Delete(':id')
  async removeCartByID(@Param('id') id: string) {
    try {
      return this.cartService.removeCartByID(+id);
    } catch (error) {
      throw error.message;
    }
  }
}
