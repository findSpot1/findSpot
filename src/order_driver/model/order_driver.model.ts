import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, HasOne, Model, Table } from "sequelize-typescript";
import { Order } from "../../order/models/order.model";
import { Driver } from "../../driver/model/driver.model";

interface IOrderDrivertCreationAttr {
  distance: number;
  get_product_time: Date;
  arrived_product_time: Date;
  duration: string; 
  driver_id: number;
  order_id: number;
  comment: string;
}

@Table({ tableName: 'OrderDriver' })
export class OrderDriver extends Model<OrderDriver, IOrderDrivertCreationAttr> {
  @ApiProperty({ example: 1, description: 'Driver order ID' })
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
  })
  id: number;

  @ApiProperty({ example: '12 km', description: 'Distance' })
  @Column({
    type: DataType.INTEGER,
  })
  distance: number;
  @ApiProperty({ example: '17.02.2024 12:05', description: 'Get product time' })
  @Column({
    type: DataType.DATE,
  })
  get_product_time: Date;

  @ApiProperty({
    example: '17.02.2024 12:27',
    description: 'Arrived product time',
  })
  @Column({
    type: DataType.DATE,
  })
  arrived_product_time: Date;

  @ApiProperty({ example: '17 min', description: 'Duration' })
  @Column({
    type: DataType.STRING,
  })
  duration: string;
  @ApiProperty({ example: 1, description: 'Driver ID' })
  @ForeignKey(() => Driver)
  @Column({
    type: DataType.INTEGER,
  })
  driver_id: number;

  @BelongsTo(() => Driver)
  driver: Driver;

  @ApiProperty({ example: 1, description: 'Order ID' })
  @ForeignKey(() => Order)
  @Column({
    type: DataType.INTEGER,
  })
  order_id: number;

  @BelongsTo(() => Order)
  order: Order;

  @ApiProperty({ example: 'Good job!', description: 'Comment' })
  @Column({
    type: DataType.STRING,
  })
  comment: string;

  // @HasOne(()=>Order)
  // orders: Order;
}
