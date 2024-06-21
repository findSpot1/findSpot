import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Business } from "../../business/models/business.model";
import { SmallCategory } from "../../small_category/models/small_category.model";

interface IBigCategoryCreationAttr{
    name: string;
    description: string;
}

@Table({ tableName: 'Big_category' })
export class BigCategory extends Model<BigCategory, IBigCategoryCreationAttr> {
  @ApiProperty({ example: 1, description: 'BigCategory ID' })
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
  })
  id: number;
  @ApiProperty({
    example: "BigCategory's name",
    description: "BigCategory's name",
  })
  @Column({
    type: DataType.STRING,
  })
  name: string;
  @ApiProperty({
    example: "BigCategory's description",
    description: "BigCategory's description",
  })
  @Column({
    type: DataType.STRING,
  })
  description: string;

  @HasMany(() => Business)
  business: Business[];

  @HasMany(() => SmallCategory)
  small_category: SmallCategory[];
}
