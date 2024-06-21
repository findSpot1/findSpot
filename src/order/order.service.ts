import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from './models/order.model';
import { CartService } from '../cart/cart.service';
import { ProductOrServiceService } from '../product_or_service/product_or_service.service';
import { Cart } from '../cart/model/cart.model';
import { OrderItem } from '../order_items/model/order_item.model';
import { UpdateOrderStatusDto } from './dto/update-orderStatus.dto';
import { OrderItemsService } from '../order_items/order_items.service';
import Stripe from 'stripe';
import { UsersService } from '../users/users.service';
import { BusinessService } from '../business/business.service';
import { DriverService } from '../driver/driver.service';
import { OrderDriversService } from '../order_driver/order_driver.service';
import { OrderDriver } from '../order_driver/model/order_driver.model';
import { Sequelize } from 'sequelize-typescript';

//OrderService creation
@Injectable()
export class OrderService {
  private stripe: Stripe;
  constructor(
    @InjectModel(Order) private readonly orderRepo: typeof Order,
    @InjectModel(OrderDriver)
    private readonly orderDriverModel: typeof OrderDriver,
    @InjectModel(Cart) private readonly cartModel: typeof Cart,
    @InjectModel(OrderItem) private readonly orderItemModel: typeof OrderItem,
    private readonly orderItemService: OrderItemsService,
    private readonly cartService: CartService,
    private readonly productService: ProductOrServiceService,
    private readonly clientService: UsersService,
    private readonly businessService: BusinessService,
    private readonly driverService: DriverService,
    private sequelize: Sequelize,
    private readonly orderDriverService: OrderDriversService,
  ) {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2024-04-10',
    });
  }
  // async create(createOrderDto: CreateOrderDto) {
  //   try {
  //     const client = await this.clientService.findUserById(
  //       createOrderDto.client_id,
  //     );
  //     const business = await this.businessService.findOne(
  //       createOrderDto.business_id,
  //     );
  //     const driver = await this.driverService.findDriverByID(
  //       createOrderDto.driver_id,
  //     );

  //     if (!client || !business || !driver) {
  //       throw new BadRequestException('Invalid client, business, or driver ID');
  //     }

  //     const transaction = await this.sequelize.transaction();

  //     // if (createOrderDto.payment_type === 'card') {
  //     //   // To'lovni amalga oshirish
  //     //   const paymentIntent = await this.stripe.paymentIntents.create({
  //     //     amount: createOrderDto.totalPrice + createOrderDto.shipping_price,
  //     //     currency: 'sum',
  //     //     description: `Order payment by client ${client.full_name}`,
  //     //     payment_method: client.card_number,
  //     //     confirm: true,
  //     //   });

  //     //   // Biznesga pul o'tkazish
  //     //   await this.stripe.transfers.create({
  //     //     amount: createOrderDto.totalPrice,
  //     //     currency: 'sum',
  //     //     destination: business.accountNumber,
  //     //   });

  //     //   // Haydovchiga pul o'tkazish
  //     //   await this.stripe.transfers.create({
  //     //     amount: createOrderDto.shipping_price,
  //     //     currency: 'sum',
  //     //     destination: driver.card_number,
  //     //   });
  //     // }

  //     const cart = await this.cartModel.findByPk(createOrderDto.cart_id, {
  //       include: ['cartItems'],
  //     });
  //     console.log('Order Service created');

  //     const order = await this.orderRepo.create(
  //       {
  //         cart_id: createOrderDto.cart_id,
  //         client_id: cart.client_id,
  //         business_id: cart.business_id,
  //         status: 'processing',
  //         payment_type: createOrderDto.payment_type,
  //         comment: createOrderDto.comment,
  //         totalPrice: cart.totalPrice,
  //       },
  //       { transaction },
  //     );
  //     order.total_price = order.totalPrice + order.shipping_price;
  //     // console.log(cart);
  //     await order.save();

  //     // Create order items from cart items
  //     if (cart) {
  //       const orderItems = cart.cartItems.map((cartItem) => ({
  //         order_id: order.id,
  //         product_id: cartItem.productId,
  //         quantity: cartItem.quantity,
  //         totalPrice: cartItem.totalPrice,
  //       }));
  //       console.log(cart.cartItems);

  //       const orderItem = await this.orderItemModel.bulkCreate(orderItems);
  //       // const orderItem = await this.orderItemModel.bulkCreate(orderItems);

  //       await this.orderDriverModel.create(
  //         {
  //           order_id: order.id,
  //           driver_id: order.driver_id,
  //         },
  //         { transaction },
  //       );

  //       orderItem.map((item) => {
  //         this.productService.addQuantityOfSelling(
  //           item.product_id,
  //           item.quantity,
  //         );
  //       });
  //     }
  //     // Update the cart status to 'converted'
  //     await this.cartModel.update(
  //       { status: 'converted' },
  //       { where: { id: createOrderDto.cart_id } },
  //     );

  //     await transaction.commit();
  //     return order;
  //   } catch (error) {
  //     // await transaction.rollback();

  //     if (error.type === 'StripeCardError') {
  //       // Kartadan pul yechib olishda xatolik
  //       throw new BadRequestException('Insufficient funds on the card');
  //     } else {
  //       // Boshqa xatolik
  //       throw new BadRequestException(error.message);
  //     }
  //   }
  // }

  async create(createOrderDto: CreateOrderDto) {
    const transaction = await this.sequelize.transaction();

    try {
      const client = await this.clientService.findUserById(
        createOrderDto.client_id,
      );
      const business = await this.businessService.findOne(
        createOrderDto.business_id,
      );
      const driver = await this.driverService.findDriverByID(
        createOrderDto.driver_id,
      );

      if (!client || !business || !driver) {
        throw new BadRequestException('Invalid client, business, or driver ID');
      }

      const cart = await this.cartModel.findByPk(createOrderDto.cart_id, {
        include: ['cartItems'],
      });
      if (!cart) {
        throw new BadRequestException('Cart not found');
      }

      console.log('Order Service created');

      const order = await this.orderRepo.create(
        {
          cart_id: createOrderDto.cart_id,
          client_id: cart.client_id,
          business_id: cart.business_id,
          status: 'processing',
          payment_type: createOrderDto.payment_type,
          comment: createOrderDto.comment,
          totalPrice: cart.totalPrice,
        },
        { transaction },
      );
      order.total_price = order.totalPrice + createOrderDto.shipping_price; // to'g'ri o'zgartirilgan
      await order.save({ transaction });

      // Create order items from cart items
      const orderItems = cart.cartItems.map((cartItem) => ({
        order_id: order.id,
        product_id: cartItem.productId,
        quantity: cartItem.quantity,
        totalPrice: cartItem.totalPrice,
      }));

      await this.orderItemModel.bulkCreate(orderItems, { transaction });

      await this.orderDriverModel.create(
        {
          order_id: order.id,
          driver_id: createOrderDto.driver_id,
        },
        { transaction },
      );

      for (const item of orderItems) {
        await this.productService.addQuantityOfSelling(
          item.product_id,
          item.quantity,
        );
      }

      // Update the cart status to 'converted'
      await this.cartModel.update(
        { status: 'converted' },
        { where: { id: createOrderDto.cart_id }, transaction },
      );

      await transaction.commit();
      return order;
    } catch (error) {
      await transaction.rollback();
      if (error.type === 'StripeCardError') {
        // Kartadan pul yechib olishda xatolik
        throw new BadRequestException('Insufficient funds on the card');
      } else {
        // Boshqa xatolik
        throw new BadRequestException(error.message);
      }
    }
  }

  async findAll() {
    try {
      const order = await this.orderRepo.findAll({ include: { all: true } });
      return { order };
    } catch (error) {
      throw error.message;
    }
  }

  async findOne(id: number) {
    try {
      const oredercha = await this.orderRepo.findByPk(id, {
        include: { all: true },
      });
      return oredercha;
    } catch (error) {
      throw error.message;
    }
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    try {
      const check = await this.findOne(id);
      if (!check) {
        throw new NotFoundException(`Order with ID ${id} not found`);
      }
      return await this.orderRepo.update(updateOrderDto, { where: { id } });
    } catch (error) {
      throw error.message;
    }
  }

  async remove(id: number) {
    try {
      const check = await this.findOne(id);
      if (!check) {
        throw new NotFoundException(`Order with ID ${id} not found`);
      }
      return await this.orderRepo.destroy({ where: { id } });
    } catch (error) {
      throw error.message;
    }
  }

  async updateStatus(
    id: number,
    updateOrderStatusDto: UpdateOrderStatusDto,
  ): Promise<Order> {
    const order = await this.findOne(id);
    return order.update({ status: updateOrderStatusDto.status });
  }
  async findAllOrderByClientID(clientID: string): Promise<Order[]> {
    try {
      return await this.orderRepo.findAll({
        where: { client_id: clientID },
        include: { all: true },
      });
    } catch (error) {
      throw error;
    }
  }
  async totalCommerce() {
    try {
      console.log("Service");
      
      let sum = 0;
      const orders = await this.orderRepo.findAll({
        include: { all: true },
      });
      orders.forEach((order) => {
        sum += order.totalPrice;
      });
      return sum;
    } catch (error) {
      throw error;
    }
  }
}
