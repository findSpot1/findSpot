import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { Business } from '../../business/models/business.model';
import { User } from '../../users/models/user.model';
import { OrderDriver } from '../../order_driver/model/order_driver.model';
import { OrderItem } from '../../order_items/model/order_item.model';
import { Cart } from '../../cart/model/cart.model';
import { Driver } from '../../driver/model/driver.model';

interface IOrderCreationAttr {
  totalPrice: number;
  shipping_price: number;
  total_price: number;
  client_id: number;
  business_id: number;
  cart_id: number;
  payment_type: string;
  status:
    | 'pending'
    | 'processing'
    | 'shipped'
    | 'delivered'
    | 'cancelled'
    | 'refunded';
  comment: string;
  driver_id: number;
}

//Order creation attributes

@Table({ tableName: 'Order' })
export class Order extends Model<Order, IOrderCreationAttr> {
  @ApiProperty({ example: 1, description: 'Order ID' })
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
  })
  id: number;

  @ApiProperty({ example: 16000, description: 'Total_priceOf_products' })
  @Column({
    type: DataType.FLOAT,
    defaultValue: 0,
  })
  totalPrice: number;

  @ApiProperty({ example: 1500, description: 'Shipping price' })
  @Column({
    type: DataType.FLOAT,
    defaultValue: 7000,
  })
  shipping_price: number;

  @ApiProperty({ example: 1500, description: 'Total price' })
  @Column({
    type: DataType.FLOAT,
    defaultValue: 0,
  })
  total_price: number;

  @ApiProperty({ example: 1, description: 'Client ID' })
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  client_id: number;

  @BelongsTo(() => User)
  client: User;

  @ApiProperty({ example: 1, description: 'Business ID' })
  @ForeignKey(() => Business)
  @Column({
    type: DataType.INTEGER,
  })
  business_id: number;

  @BelongsTo(() => Business)
  business: Business;

  @ApiProperty({ example: 1, description: 'Driver ID' })
  @ForeignKey(() => Driver)
  @Column({
    type: DataType.INTEGER,
  })
  driver_id: number;

  @BelongsTo(() => Driver)
  driver: Driver;

  @ApiProperty({ example: 1, description: 'Cart ID' })
  @ForeignKey(() => Cart)
  @Column({
    type: DataType.INTEGER,
  })
  cart_id: number;

  @BelongsTo(() => Cart)
  cart: Cart;

  @ApiProperty({
    example: 'Cash',
    description:
      "Payment type (bu yerda 2 xil qiymat bo'ladi --> cash yoki card)",
  })
  @Column({
    type: DataType.ENUM('cash', 'card'),
    defaultValue: 'cash',
  })
  payment_type: 'cash' | 'card';

  @ApiProperty({
    example: 'pending, processing, shipped, delivered, cancelled, refunded',
    description: 'Status',
  })
  @Column({
    type: DataType.ENUM(
      'pending',
      'processing',
      'shipped',
      'delivered',
      'cancelled',
      'refunded',
    ),
    defaultValue: 'pending',
  })
  status:
    | 'pending'
    | 'processing'
    | 'shipped'
    | 'delivered'
    | 'cancelled'
    | 'refunded';

  @ApiProperty({
    example: 'Please deliver as soon as possible!',
    description: 'Comment of order',
  })
  @Column({
    type: DataType.STRING,
  })
  comment: string;

  @HasOne(() => OrderDriver)
  order_driver: OrderDriver;

  @HasMany(() => OrderItem)
  orderItems: OrderItem[];

  async recalculateTotalPrice(): Promise<void> {
    const orderItems = await this.$get('orderItems');
    const totalPrice = orderItems.reduce(
      (sum, item) => sum + item.totalPrice,
      0,
    );
    await this.update({ totalPrice });
  }
}
