import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Order } from './models/order.model';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { CartModule } from '../cart/cart.module';
import { ProductOrServiceModule } from '../product_or_service/product_or_service.module';
import { OrderItemsModule } from '../order_items/order_items.module';
import { OrderItem } from '../order_items/model/order_item.model';
import { Cart } from '../cart/model/cart.model';
import { DriverModule } from '../driver/driver.module';
import { UsersModule } from '../users/user.module';
import { BusinessModule } from '../business/business.module';
import { OrderDriverModule } from '../order_driver/order_driver.module';
import { OrderDriver } from '../order_driver/model/order_driver.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Order,OrderItem,Cart,OrderDriver]),
    JwtModule,
    CartModule,
    OrderItemsModule,
    ProductOrServiceModule,
    DriverModule,
    UsersModule,
    OrderDriverModule,
    BusinessModule,

  ],
  controllers: [OrderController],
  providers: [OrderService, JwtService],
  exports: [OrderService],
})
export class OrderModule {}
