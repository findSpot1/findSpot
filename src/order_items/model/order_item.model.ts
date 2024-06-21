import {
  BeforeSave,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Order } from '../../order/models/order.model';
import { ProductOrService } from '../../product_or_service/models/product_or_service.model';
import { ApiProperty } from '@nestjs/swagger';

interface IOrderItemCreationAttr {
  order_id: number;
  product_id: number;
  quantity: number;
  totalPrice: number;
}

@Table({ tableName: 'OrderItems' })
export class OrderItem extends Model<Order, IOrderItemCreationAttr> {
  @ApiProperty({ example: 1, description: 'OrderItem ID' })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ApiProperty({ example: 1, description: 'Order ID' })
  @ForeignKey(() => Order)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  order_id: number;

  @BelongsTo(() => Order)
  order: Order;

  @ApiProperty({ example: 1, description: 'Product ID' })
  @ForeignKey(() => ProductOrService)
  @Column({
    type: DataType.INTEGER,
    // allowNull: false,
  })
  product_id: number;

  @BelongsTo(() => ProductOrService)
  product: ProductOrService;

  @ApiProperty({ example: 10, description: 'Quantity of products' })
  @Column({
    type: DataType.INTEGER,
  })
  quantity: number;

  @ApiProperty({ example: 10, description: 'Total price of products' })
  @Column({
    type: DataType.FLOAT,
  })
  totalPrice: number;

  @BeforeSave
  static async calculateTotalPrice(instance: OrderItem) {
    const product = await instance.$get('product');
    instance.totalPrice = product.price * instance.quantity;
  }

  async increaseQuantity(amount: number = 1): Promise<void> {
    this.quantity += amount;
    await this.save();
    await this.order.recalculateTotalPrice();
  }

  async decreaseQuantity(amount: number = 1): Promise<void> {
    if (this.quantity - amount < 1) {
      throw new Error('Quantity cannot be less than 1');
    }
    this.quantity -= amount;
    await this.save();
    await this.order.recalculateTotalPrice();
  }
}
