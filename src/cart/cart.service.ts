import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Cart } from './model/cart.model';

@Injectable()
export class CartService {
  constructor(@InjectModel(Cart) private readonly cartRepo: typeof Cart) {}
  async createCart(createCartDto: CreateCartDto) {
    try {
      const cart = await this.cartRepo.create(createCartDto);
      
      return cart;
    } catch (error) {
      throw error.message;
    }
  }
  async findAllCart() {
    try {
      return await this.cartRepo.findAll();
    } catch (error) {
      throw error.message;
    }
  }

  async findAllCartByClientID(id: number) {
    try {
      return await this.cartRepo.findAll({ where: { client_id: id } });
    } catch (error) {
      throw error.message;
    }
  }

  async findCartByID(id: number) {
    try {
      return await this.cartRepo.findByPk(id);
    } catch (error) {
      throw error.message;
    }
  }
  async updateCartByID(id: number, updateCartDto: UpdateCartDto) {
    try {
      const checking = await this.findCartByID(id);
      if (!checking) throw new NotFoundException(`Cart ${id} not found`);
      return await this.cartRepo.update(updateCartDto, { where: { id } });
    } catch (error) {
      throw error.message;
    }
  }
  async removeCartByID(id: number) {
    try {
      const checking = await this.findCartByID(id);
      if (!checking) throw new NotFoundException(`Cart ${id} not found`);
      return await this.cartRepo.destroy({
        where: { id: id },
      });
    } catch (error) {
      throw error.message;
    }
  }

  async removeCartByClientID(id: number) {
    try {
      const checking = await this.findOneByClientID(id);
      if (!checking) throw new NotFoundException(`Cart ${id} not found`);
      return await this.cartRepo.destroy({
        where: { client_id: id },
      });
    } catch (error) {
      throw error.message;
    }
  }

  async findOneByClientID(id: number) {
    try {
      return await this.cartRepo.findOne({
        where: { client_id: id },
      });
    } catch (error) {
      throw error.message;
    }
  }

  async recalculateTotalPrice(cartId: number): Promise<void> {
    const cart = await this.findCartByID(cartId);
    const cartItems = await cart.$get('cartItems');
    const totalPrice = cartItems.reduce(
      (sum, item) => sum + item.totalPrice,
      0,
    );
    await cart.update({ totalPrice });
  }

}
