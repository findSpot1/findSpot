import { Module } from '@nestjs/common';
import { OrderDriversController } from './order_driver.controller';
import { OrderDriversService } from './order_driver.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrderDriver } from './model/order_driver.model';
import { JwtModule } from '@nestjs/jwt';
import { OrderModule } from '../order/order.module';

@Module({
  imports: [SequelizeModule.forFeature([OrderDriver]),JwtModule],
  controllers: [OrderDriversController],
  providers: [OrderDriversService],
  exports: [OrderDriversService],
})
export class OrderDriverModule {}
