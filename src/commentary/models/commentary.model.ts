import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Business } from "../../business/models/business.model";
import { User } from "../../users/models/user.model";

interface ICommentaryCreationAttr{
    comment: string;
    client_id: number;
    business_id: number;
    commentary_likes:number;
}

@Table({ tableName: 'Commentary' })
export class Commentary extends Model<Commentary, ICommentaryCreationAttr> {
  @ApiProperty({ example: 1, description: 'Commentary ID' })
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
  })
  id: number;

  @ApiProperty({ example: 'It is amazing', description: 'comment' })
  @Column({
    type: DataType.STRING,
  })
  comment: string;

  @ApiProperty({ example: 1, description: 'Commentary likes' })
  @Column({
    type: DataType.INTEGER,
  })
  commentary_likes: number;


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
}
