import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CartItemsService } from './cart_items.service';
import { CreateCartItemDto } from './dto/create-cart_item.dto';
import { UpdateCartItemDto } from './dto/update-cart_item.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CartItem } from './model/cart_item.model';

@ApiTags('Cart_items')
@Controller('cart-items')
export class CartItemsController {
  constructor(private readonly cartItemsService: CartItemsService) {}

  @ApiOperation({ summary: ' Create a cart item' })
  @ApiResponse({ status: 200, type: CartItem })
  @Post()
  async createCartItem(@Body() createCartItemDto: CreateCartItemDto):Promise<CreateCartItemDto> {
    try {
      return await this.cartItemsService.create(createCartItemDto);
    } catch (error) {
      return error;
    }
  }
  @ApiOperation({ summary: ' Get all cart items' })
  @ApiResponse({ status: 200, type: CartItem })
  @Get()
  async findAllCartItems():Promise<CartItem[]> {
    try {
      return await this.cartItemsService.findAll();
    } catch (error) {
      return error;
    }
  }
  @ApiOperation({ summary: ' Get cart item by id' })
  @ApiResponse({ status: 200, type: CartItem })
  @Get(':id')
  async findOneCartItem(@Param('id') id: string) {
    try {
      return await this.cartItemsService.findOne(+id);
    } catch (error) {
      return error;
    }
  }
  @ApiOperation({ summary: 'Update cart item by id' })
  @ApiResponse({ status: 200, type: CartItem })
  @Patch(':id')
  async updateCartItem(@Param('id') id: string, @Body() updateCartItemDto: UpdateCartItemDto) {
    try {
      return await this.cartItemsService.update(+id, updateCartItemDto);
    } catch (error) {
      return error;
    }
  }
  @ApiOperation({ summary: 'Delete cart item by id' })
  @ApiResponse({ status: 200, type: CartItem })
  @Delete(':id')
  async removeCartItem(@Param('id') id: string) {
    try {
      return await this.cartItemsService.remove(+id);
    } catch (error) {
      return error;
    }
  }
  @ApiOperation({ summary: 'Get cart item by cart id' })
  @ApiResponse({ status: 200, type: CartItem })
  @Get('cart/:id')
  async findOneByCartID(@Param('id') id: string) {
    try {
      return await this.cartItemsService.findOneByCartID(+id);
    } catch (error) {
      return error;
    }
  }

}
