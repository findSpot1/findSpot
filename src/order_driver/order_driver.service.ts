import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { OrderDriver } from './model/order_driver.model';
import { CreateOrderDriverDto } from './dto/create-order_driver.dto';
import { UpdateOrderDriverDto } from './dto/update-order_driver.dto';
import { OrderService } from '../order/order.service';

@Injectable()
export class OrderDriversService {
  constructor(
    @InjectModel(OrderDriver)
    private readonly orderDriverRepo: typeof OrderDriver,
    // private readonly orderService: OrderService,
  ) {}

  async create(createOrderDriverDto: CreateOrderDriverDto) {
    try {
      const orderDriver =
        await this.orderDriverRepo.create(createOrderDriverDto);
      return orderDriver;
    } catch (error) {
      throw error.message;
    }
  }

  async findAll() {
    try {
      return await this.orderDriverRepo.findAll({ include: { all: true } });
    } catch (error) {
      throw error.message;
    }
  }

  async findOne(id: number) {
    try {
      return await this.orderDriverRepo.findByPk(id, {
        include: { all: true },
      });
    } catch (error) {
      throw error.message;
    }
  }

  async update(id: number, updateOrderDriverDto: UpdateOrderDriverDto) {
    try {
      const check = await this.findOne(id);
      if (check) {
        return await this.orderDriverRepo.update(updateOrderDriverDto, {
          where: { id: id },
        });
      } else {
        throw new Error('Not Found');
      }
    } catch (error) {
      throw error.message;
    }
  }

  async remove(id: number) {
    try {
      const check = await this.findOne(id);
      if (check) {
        return await this.orderDriverRepo.destroy({ where: { id: id } });
      } else {
        throw new Error('Not Found');
      }
    } catch (error) {
      throw error.message;
    }
  }
}
