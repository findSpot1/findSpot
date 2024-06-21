import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Business } from "../../business/models/business.model";
import { BigCategory } from "../../big_category/models/big_category.model";

interface ISmallCategoryCreationAttr {
  name: string;
  big_category_id: number;
  description: string;
}

@Table({ tableName: 'Small_category' })
export class SmallCategory extends Model<
  SmallCategory,
  ISmallCategoryCreationAttr
> {
  @ApiProperty({ example: 1, description: 'Small_category ID' })
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
  })
  id: number;
  @ApiProperty({
    example: 'Small_category name',
    description: 'Small_category name',
  })
  @Column({
    type: DataType.STRING,
  })
  name: string;
  @ApiProperty({
    example: 'Description1',
    description: 'Small_category description',
  })
  @Column({
    type: DataType.STRING,
  })
  description: string;
  @ApiProperty({ example: 1, description: 'Big_category ID' })
  @ForeignKey(()=>BigCategory)
  @Column({
    type: DataType.INTEGER,
  })
  big_category_id: number;

  @BelongsTo(()=>BigCategory)
  big_category: BigCategory;

  @HasMany(() => Business)
  business: Business[];
  
}
