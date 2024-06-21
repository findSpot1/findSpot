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
import { User } from '../../users/models/user.model';
import { Order } from '../../order/models/order.model';
import { ProductOrService } from '../../product_or_service/models/product_or_service.model';
import { CartItem } from '../../cart_items/model/cart_item.model';
import { Business } from '../../business/models/business.model';

interface ICartCreationAttr {
  client_id: number;
  business_id: number;
  totalPrice: number;
  status: 'active' | 'completed' | 'converted';
}

@Table({ tableName: 'Cart' })
export class Cart extends Model<Cart, ICartCreationAttr> {
  @ApiProperty({ example: 1, description: 'Cart ID' })
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
  })
  id: number;
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

  @ApiProperty({ example: 1, description: 'Cart status' })
  @Column({
    type: DataType.ENUM('active', 'completed', 'converted'),
    defaultValue: 'active',
  })
  status: 'active' | 'completed' | 'converted';
  @ApiProperty({ example: 1, description: 'Total price' })
  @Column({
    type: DataType.FLOAT,
    defaultValue: 0,
  })
  totalPrice: number;

  @HasMany(() => CartItem)
  cartItems: CartItem[];

  @HasOne(() => Order)
  order: Order;

  async recalculateTotalPrice(): Promise<void> {
    const cartItems = await this.$get('cartItems');
    const totalPrice = cartItems.reduce(
      (sum, item) => sum + item.totalPrice,
      0,
    );
    await this.update({ totalPrice });
  }
}
  //Savatchada business_id kerak chunki bitta business uchun bitta alohida savat ochilishi kerak,
  // agar client boshqa business dan harid amalga oshirmoqchi bo'lsa unda alohida savatcha ochilishi kerak, -->
  // demak bizda clientItems degan alohida table kerak bo'lishi mumkin
  // demak cart  business_id bilan ham bog'lanishi kerak
  //

