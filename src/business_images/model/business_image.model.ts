import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Business } from "../../business/models/business.model";

interface IBusinessImagesCreationAttr{
    image: string;
    business_id: number;
    is_main_image: boolean;
    is_active: boolean;
    image_comment: string;
}

@Table({ tableName: 'business_image' })
export class BusinessImage extends Model<
  BusinessImage,
  IBusinessImagesCreationAttr
> {
  @ApiProperty({ example: 1, description: 'Business Image ID' })
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
  })
  id: number;
  @ApiProperty({ example: 'https://image.com', description: 'Image URL' })
  @Column({
    type: DataType.STRING,
  })
  image: string;

  @ApiProperty({ example: 1, description: 'Business ID' })
  @ForeignKey(() => Business)
  @Column({
    type: DataType.INTEGER,
  })
  business_id: number;
  @BelongsTo(() => Business)
  business: Business;
  
  @ApiProperty({ example: true, description: 'Is main image' })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_main_image: boolean;
  @ApiProperty({ example: true, description: 'Is active' })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_active: boolean;
  @ApiProperty({ example: 'Image comment', description: 'Image comment' })
  @Column({
    type: DataType.STRING,
  })
  image_comment: string;
}
