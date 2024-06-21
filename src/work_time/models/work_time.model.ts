import { ApiProperty } from '@nestjs/swagger';
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Business } from '../../business/models/business.model';

interface IWorkTimeCreationAttr {
  Day: string;
  open_time: string;
  close_time: string;
  business_id: number;
}

@Table({ tableName: 'Work-time' })
export class WorkTime extends Model<WorkTime, IWorkTimeCreationAttr> {
  @ApiProperty({ example: 1, description: 'Work-time ID' })
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
  })
  id: number;
  @ApiProperty({ example: 'Sunday', description: 'Day' })
  @Column({
    type: DataType.STRING,
  })
  Day: string;
  @ApiProperty({ example: '09:00', description: 'Open hour' })
  @Column({
    type: DataType.STRING,
  })
  open_time: string;
  @ApiProperty({ example: '18:00', description: 'Close hour' })
  @Column({
    type: DataType.STRING,
  })
  close_time: string;
  
  @ApiProperty({ example: 1, description: 'Business ID' })
  @ForeignKey(() => Business)
  @Column({
    type: DataType.INTEGER,
  })
  business_id: number;

  @BelongsTo(()=>Business)
  business: Business;
  
}
