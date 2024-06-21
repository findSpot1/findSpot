import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderItemDto } from './dto/create-order_item.dto';
import { UpdateOrderItemDto } from './dto/update-order_item.dto';
import { InjectModel } from '@nestjs/sequelize';
import { OrderItem } from './model/order_item.model';
import { ProductOrServiceService } from '../product_or_service/product_or_service.service';

@Injectable()
export class OrderItemsService {
  constructor(
    @InjectModel(OrderItem) private readonly orderItemRepo: typeof OrderItem,
    private readonly productService: ProductOrServiceService
  ) {}

  async create(createOrderItemDto: CreateOrderItemDto): Promise<OrderItem> {
    try {
      console.log("ga OrderItemsService dan salom");
      const orderItem = await this.orderItemRepo.create(createOrderItemDto);
      // const product = await this.productService.findOne(orderItem.product_id)
      // product.quantity_of_selling += orderItem.quantity
      // console.log('Quantity of Selling -- > ', product.quantity_of_selling);
      // console.log('OrderItem -- > ', orderItem);
      // console.log("Product -- > ",product);
            
      // await product.save()
      return orderItem; 
    } catch (error) {
      throw error.message;
    }
  }

  async findAll(): Promise<OrderItem[]> {
    try {
      return await this.orderItemRepo.findAll({ include: { all: true } });
    } catch (error) {
      throw error.message;
    }
  }

  async findOneById(id: number): Promise<OrderItem> {
    try {
      return await this.orderItemRepo.findByPk(id, {
        include: { all: true },
      });
    } catch (error) {
      throw error.message;
    }
  }

  async update(
    id: number,
    updateOrderItemDto: UpdateOrderItemDto,
  ): Promise<OrderItem> {
    try {
      const orderItem = await this.findOneById(id);
      if (!orderItem) {
        throw new NotFoundException(`OrderItem with id ${id} not found`);
      }
      const updatedOrderItem = await orderItem.update(updateOrderItemDto);
      await updatedOrderItem.order.recalculateTotalPrice();
      return updatedOrderItem;
    } catch (error) {
      throw error.message;
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const orderItem = await this.findOneById(id);
      // const orderId = orderItem.order_id;
      await orderItem.destroy();
      const order = await orderItem.$get('order');
      await order.recalculateTotalPrice();
    } catch (error) {
      throw error.message;
    }
  }

}
