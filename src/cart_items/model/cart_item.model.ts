import { ApiProperty } from "@nestjs/swagger";
import { BeforeSave, BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Cart } from "../../cart/model/cart.model";
import { ProductOrService } from "../../product_or_service/models/product_or_service.model";

interface ICartItemsCreationAttr {
  readonly cartId: number;
  readonly productId: number;
  readonly quantity: number;
  readonly totalPrice: number;
}


@Table({ tableName: 'Cart_items' })
export class CartItem extends Model<CartItem, ICartItemsCreationAttr> {
  @ApiProperty({ example: 1, description: 'Cart_items ID' })
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
  })
  id: number;
  @ApiProperty({ example: 1, description: 'Cart ID' })
  @ForeignKey(() => Cart)
  @Column({
    type: DataType.INTEGER,
  })
  cartId: number;
  @BelongsTo(() => Cart)
  cart: Cart;
  @ApiProperty({ example: 1, description: 'Product ID' })
  @ForeignKey(() => ProductOrService)
  @Column({
    type: DataType.INTEGER,
  })
  productId: number;
  @BelongsTo(() => ProductOrService)
  product: ProductOrService;
  @ApiProperty({ example: 12500, description: 'Quantity of cart items' })
  @Column({
    type: DataType.INTEGER,
  })
  quantity: number;

  @Column({
    type: DataType.FLOAT,
    defaultValue:0
  })
  totalPrice: number;

  @BeforeSave
  static async calculateTotalPrice(instance: CartItem) {
    const product = await instance.$get('product');
    instance.totalPrice = product.price * instance.quantity;
  }

  async increaseQuantity(amount: number = 1): Promise<void> {
    this.quantity += amount;
    await this.save();
    await this.cart.recalculateTotalPrice();
  }

  async decreaseQuantity(amount: number = 1): Promise<void> {
    if (this.quantity - amount < 1) {
      throw new Error('Quantity cannot be less than 1');
    }
    this.quantity -= amount;
    await this.save();
    await this.cart.recalculateTotalPrice();
  }
}
