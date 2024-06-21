import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { Business } from '../../business/models/business.model';
import { Cart } from '../../cart/model/cart.model';
import { OrderItem } from '../../order_items/model/order_item.model';
import { CartItem } from '../../cart_items/model/cart_item.model';

interface IProductOrServiceCreationAttr {
  name: string;
  price: number;
  is_available_onlineOrders: boolean;
  business_id: number;
  quantity_of_selling: number;
  image: string;
}

@Table({ tableName: 'product_or_service' })
export class ProductOrService extends Model<
  ProductOrService,
  IProductOrServiceCreationAttr
> {
  @ApiProperty({ example: 1, description: 'Product_Service ID' })
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
  })
  id: number;
  @ApiProperty({
    example: 'Product_Service name',
    description: 'Product_Service name',
  })
  @Column({
    type: DataType.STRING,
  })
  name: string;
  @ApiProperty({ example: 1, description: 'Product_Service price' })
  @Column({
    type: DataType.INTEGER,
  })
  price: number;
  @ApiProperty({
    example: true,
    description: 'Product_Service is_available_onlineOrders',
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_available_onlineOrders: boolean;
  @ApiProperty({ example: 1, description: 'Business ID' })
  @ForeignKey(() => Business)
  @Column({
    type: DataType.INTEGER,
  })
  business_id: number;
  @BelongsTo(() => Business)
  business: Business;
  @ApiProperty({
    example: 1,
    description: 'Product_Service quantity_of_orders',
  })
  @Column({
    type: DataType.INTEGER,
  })
  quantity_of_selling: number;

  @ApiProperty({
    example: 'product.png',
    description: 'Product_Service image',
  })
  @Column({
    type: DataType.STRING,
  })
  image: string;

  @HasOne(() => OrderItem)
  orderItem: OrderItem;
  @HasOne(() => CartItem)
  cartItem: CartItem;
}
