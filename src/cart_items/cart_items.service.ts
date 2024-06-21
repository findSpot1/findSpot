import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCartItemDto } from './dto/create-cart_item.dto';
import { UpdateCartItemDto } from './dto/update-cart_item.dto';
import { InjectModel } from '@nestjs/sequelize';
import { CartItem } from './model/cart_item.model';
import { CartService } from '../cart/cart.service';
import { ProductOrServiceService } from '../product_or_service/product_or_service.service';

@Injectable()
export class CartItemsService {
  constructor(
    @InjectModel(CartItem) private readonly cartItemsRepo: typeof CartItem,
    private readonly cartService: CartService,
    private readonly productSer: ProductOrServiceService,
  ) {}
  async create(createCartItemDto: CreateCartItemDto): Promise<CartItem> {
    try {
      const product= await this.productSer.findOne(createCartItemDto.productId);
      const cart= await this.cartService.findCartByID(createCartItemDto.cartId);
      if(cart.business_id!== product.business_id){        
        throw new NotFoundException('You are not authorized to add this product to this cart')
      }
      if(product.is_available_onlineOrders === false){
        throw new NotFoundException('This product is not available for online orders')
      }
      const check = await this.cartItemsRepo.findOne({
        where: { cartId: createCartItemDto.cartId, productId: createCartItemDto.productId },
      });
      if (check) {
        throw new NotFoundException('This product is already added to this cart');
      }
      const cartItem = await this.cartItemsRepo.create(createCartItemDto);
      await this.cartService.recalculateTotalPrice(cartItem.cartId);
      
      return cartItem;
    } catch (error) {
      throw error.message;
    }
  }

  async findAll(): Promise<CartItem[]> {
    try {
      return await this.cartItemsRepo.findAll({ include: { all: true } });
    } catch (error) {
      throw error.message;
    }
  }
  async findOne(id: number): Promise<CartItem> {
    try {
      return await this.cartItemsRepo.findByPk(id, {
        include: { all: true },
      });
    } catch (error) {
      throw error.message;
    }
  }
  async update(
    id: number,
    updateCartItemDto: UpdateCartItemDto,
  ): Promise<CartItem> {
    try {
      const cartItem = await this.findOne(id);
      const updatedCartItem = await cartItem.update(updateCartItemDto);
      await this.cartService.recalculateTotalPrice(updatedCartItem.cartId);
      return updatedCartItem;
    } catch (error) {
      throw error.message;
    }
  }
  async remove(id: number): Promise<void> {
    try {
      const cartItem = await this.findOne(id);
      await this.cartItemsRepo.destroy({ where: { id } });
      await this.cartService.recalculateTotalPrice(cartItem.cartId);
    } catch (error) {
      throw error.message;
    }
  }
  async findOneByCartID(id: number) {
    try {
      return await this.cartItemsRepo.findOne({
        where: { cartId: id },
      });
    } catch (error) {
      throw error.message;
    }
  }

  async increaseQuantity(id: number, amount: number): Promise<CartItem> {
    const cartItem = await this.findOne(id);
    await cartItem.increaseQuantity(amount);
    return cartItem;
  }

  async decreaseQuantity(id: number, amount: number): Promise<CartItem> {
    const cartItem = await this.findOne(id);
    await cartItem.decreaseQuantity(amount);
    return cartItem;
  }
}
