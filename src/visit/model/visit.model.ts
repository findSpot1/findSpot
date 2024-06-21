import {
  Column,
  Model,
  DataType,
  CreatedAt,
  Table,
} from 'sequelize-typescript';

interface IVisitCreationAttr{
    token: string;
    createdAt: Date;
}
 
@Table({tableName: 'Visit'})
export class Visit extends Model<Visit,IVisitCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  token: string;

  @CreatedAt
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  createdAt: Date;
}
