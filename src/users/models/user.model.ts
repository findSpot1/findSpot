import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Order } from '../../order/models/order.model';
import { Stars } from '../../stars/models/star.model';
import { Commentary } from '../../commentary/models/commentary.model';
import { Address } from '../../address/model/address.model';
import { Business } from '../../business/models/business.model';
import { Cart } from '../../cart/model/cart.model';

interface IClientCreationAttr {
  full_name: string;
  phone: string;
  email: string;
  password: string;
  confirm_password: string;
  social_media: string;
  card_number: string;
  hashed_refresh_token: string;
  is_businessman: boolean;
  address_id: number;
  activation_link: string;
  is_active: boolean;
}

@Table({ tableName: 'Client' })
export class User extends Model<User, IClientCreationAttr> {
  @ApiProperty({ example: 1, description: 'Client ID' })
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
  })
  id: number;

  @ApiProperty({ example: 'Ali Valiyev', description: "Client's full name" })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  full_name: string;

  @ApiProperty({
    example: '+998951234569',
    description: "Client's phone number",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  phone: string;

  @ApiProperty({ example: 'example@gmail.com', description: "Client's email" })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email: string;

  @ApiProperty({
    example: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
    description: "Client's hashed password",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @ApiProperty({
    example: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
    description: "Client's confirm password",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  confirm_password: string;

  @ApiProperty({ example: '@example', description: "Client's social media" })
  @Column({
    type: DataType.STRING,
  })
  social_media: string;

  @ApiProperty({
    example: '8600 1532 1532 0011',
    description: "Client's card",
  })
  @Column({
    type: DataType.STRING,
  })
  card_number: string;

  @ApiProperty({
    example: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
    description: "Client's hashed refresh token",
  })
  @Column({
    type: DataType.STRING,
  })
  hashed_refresh_token: string;

  @ApiProperty({ example: 'ali@gmail.com', description: "Client's email" })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_businessman: boolean;
  @ApiProperty({ example: 1, description: "Address's ID" })
  @ForeignKey(() => Address)
  @Column({
    type: DataType.INTEGER,
    // allowNull:false
  })
  address_id: number;

  @ApiProperty({
    example: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
    description: 'Auth activation link',
  })
  @Column({
    type: DataType.STRING,
  })
  activation_link: string;

  @ApiProperty({
    example: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
    description: 'Auth is_active',
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_active: boolean;

  @BelongsTo(() => Address)
  address: Address;

  @HasMany(() => Order)
  orders: Order[];

  @HasMany(() => Commentary)
  commentray: Commentary[];

  @HasMany(() => Stars)
  star: Stars[];

  // @HasMany(() => Business)
  // workTime: Business[];

  @HasMany(() => Cart)
  cart: Cart[];
}
