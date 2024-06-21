import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Driver } from "../../driver/model/driver.model";
import { DriverCarImage } from "../../driver_car_image/model/driver_car_image.model";

interface IDriverCarCreationAttr {
    model: string;
    number: string;
    driver_id: number;
}


@Table({ tableName: 'Driver_car' })
export class DriverCar extends Model<DriverCar, IDriverCarCreationAttr> {
  @ApiProperty({ example: 1, description: 'Driver Car ID' })
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
  })
  id: number;

  @ApiProperty({ example: 1, description: 'Driver ID' })
  @ForeignKey(()=>Driver)
  @Column({
    type: DataType.INTEGER,
  })
  driver_id: number;

  @BelongsTo(()=>Driver)
  driver: Driver;

  @ApiProperty({ example: 'Nexia 1', description: 'Car model' })
  @Column({
    type: DataType.STRING,
  })
  model: string;

  @ApiProperty({ example: 'AB123**', description: 'Car number' })
  @Column({
    type: DataType.STRING,
  })
  number: string;

  @HasMany(()=>DriverCarImage)
  driver_car_image: DriverCarImage[];
}
