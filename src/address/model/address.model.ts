import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { User } from '../../users/models/user.model';

interface IAdressCreationAttr {
  city: string;
  district: string;
  street: string;
  home_number: string;
}

@Table({ tableName: 'Address' })
export class Address extends Model<Address, IAdressCreationAttr> {
  @ApiProperty({ example: 1, description: 'Address ID' })
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
  })
  id: number;

  @ApiProperty({ example: 'City name', description: 'City' })
  @Column({
    type: DataType.STRING,
  })
  city: string;

  @ApiProperty({ example: 'District name', description: 'District' })
  @Column({
    type: DataType.STRING,
  })
  district: string;

  @ApiProperty({ example: 'Street name', description: 'Street' })
  @Column({
    type: DataType.STRING,
  })
  street: string;

  @ApiProperty({ example: 1, description: 'Home number' })
  @Column({
    type: DataType.STRING,
  })
  home_number: string;

  @HasMany(()=>User)
  User: User[];
}
