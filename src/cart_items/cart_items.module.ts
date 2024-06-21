import { Module } from '@nestjs/common';
import { CartItemsService } from './cart_items.service';
import { CartItemsController } from './cart_items.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { CartItem } from './model/cart_item.model';
import { CartModule } from '../cart/cart.module';
import { ProductOrServiceModule } from '../product_or_service/product_or_service.module';

@Module({
  imports: [SequelizeModule.forFeature([CartItem]),CartModule,ProductOrServiceModule],
  controllers: [CartItemsController],
  providers: [CartItemsService],
  exports: [CartItemsService],
})
export class CartItemsModule {}
