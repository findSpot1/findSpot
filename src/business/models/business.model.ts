import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, HasMany, HasOne, Model, Table } from "sequelize-typescript";
import { WorkTime } from "../../work_time/models/work_time.model";
import { BigCategory } from "../../big_category/models/big_category.model";
import { SmallCategory } from "../../small_category/models/small_category.model";
import { Commentary } from "../../commentary/models/commentary.model";
import { Order } from "../../order/models/order.model";
import { Stars } from '../../stars/models/star.model';
import { ProductOrService } from "../../product_or_service/models/product_or_service.model";
import { User } from "../../users/models/user.model";
import { BusinessImage } from "../../business_images/model/business_image.model";

interface IBusinessCreationAttr {
  name: string;
  email: string;
  phone: string;
  location: string;
  address: string;
  web_address: string;
  social_media: string;
  big_category_id: number;
  small_category_id: number;
  average_star: number;
  description: string;
  extra: string;
  reviews: number;
  likes: number;
  owner_id: number;
  is_active: boolean;
  is_yelp_guaranteed: boolean;
  is_verified_license: boolean;
  accountNumber: string;
}

@Table({ tableName: 'Business' })
export class Business extends Model<Business, IBusinessCreationAttr> {
  @ApiProperty({ example: 1, description: 'Business ID' })
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
  })
  id: number;

  @ApiProperty({ example: 'ShoxBaraka', description: "Business's name" })
  @Column({
    type: DataType.STRING,
  })
  name: string;

  @ApiProperty({
    example: 'example@gmail.com',
    description: "Business's email",
  })
  @Column({
    type: DataType.STRING,
  })
  email: string;

  @ApiProperty({ example: '+998990001122', description: "Business's phone" })
  @Column({
    type: DataType.STRING,
  })
  phone: string;

  @ApiProperty({ example: 'Akay city', description: "Business's location" })
  @Column({
    type: DataType.STRING,
  })
  location: string;

  @ApiProperty({
    example: 'Akay city, Marvarid street',
    description: "Business's address",
  })
  @Column({
    type: DataType.STRING,
  })
  address: string;

  
  @ApiProperty({
    example: '55550021****',
    description: "Business's accountNumber",
  })
  @Column({
    type: DataType.STRING,
  })
  accountNumber: string;



  @ApiProperty({
    example: 'example.com',
    description: "Business's web address",
  })
  @Column({
    type: DataType.STRING,
  })
  web_address: string;

  @ApiProperty({ example: 1, description: 'Business big category ID' })
  @ForeignKey(() => BigCategory)
  @Column({
    type: DataType.INTEGER,
  })
  big_category_id: number;

  @BelongsTo(() => BigCategory)
  big_category: BigCategory;

  @ApiProperty({ example: 1, description: 'Business small category ID' })
  @ForeignKey(() => SmallCategory)
  @Column({
    type: DataType.INTEGER,
  })
  small_category_id: number;
  @BelongsTo(() => SmallCategory)
  small_category: SmallCategory;

  @ApiProperty({ example: 1, description: 'Business average star' })
  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  average_star: number;

  @ApiProperty({
    example: 'Business description',
    description: "Business's description",
  })
  @Column({
    type: DataType.STRING,
  })
  description: string;

  @ApiProperty({
    example: 'Extra information about the business',
    description:
      'There is wi-fi, free shipping and international shipping services available for business customers.....',
  })
  @Column({
    type: DataType.STRING,
  })
  extra: string;

  @ApiProperty({ example: 1, description: 'Business reviews' })
  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  reviews: number;

  @ApiProperty({ example: 1, description: 'Business likes' })
  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  likes: number;

 

  @ApiProperty({ example: 1, description: 'Business owner ID' })
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  owner_id: number;
  @BelongsTo(() => User)
  owner: User;

  @ApiProperty({ example: true, description: 'Business is active' })
  @Column({
    type: DataType.BOOLEAN,
  })
  is_active: boolean;

  @ApiProperty({ example: true, description: 'Business is yelp guaranteed' })
  @Column({
    type: DataType.BOOLEAN,
  })
  is_yelp_guaranteed: boolean;

  @ApiProperty({ example: true, description: 'Business is verified license' })
  @Column({
    type: DataType.BOOLEAN,
  })
  is_verified_license: boolean;

  @ApiProperty({
    example: 'https://t.me/ali_valiyev',
    description: "Business's Telegram link",
  })
  @Column({
    type: DataType.STRING,
  })
  social_media: string;

  @HasOne(() => Order)
  order: Order;

  @HasMany(() => Commentary)
  commentary: Commentary[];

  @HasMany(() => Stars)
  stars: Stars[];

  @HasMany(() => WorkTime)
  workTime: WorkTime[];

  @HasMany(() => ProductOrService)
  product_or_service: ProductOrService[];

  @HasMany(() => BusinessImage)
  business_image: BusinessImage[];
}
