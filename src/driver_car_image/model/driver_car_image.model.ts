import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { DriverCar } from "../../driver_car/model/driver_car.model";

interface ICarImageCreationAttr {
  image: string;
  car_id: number;
}

@Table({ tableName: 'car_images' })
export class DriverCarImage extends Model<
  DriverCarImage,
  ICarImageCreationAttr
> {
  @ApiProperty({ example: 1, description: 'Car Image ID' })
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
  })
  id: number;

  @ApiProperty({ example: 'car.png', description: 'Image' })
  @Column({
    type: DataType.STRING,
  })
  image: string;

  @ApiProperty({ example: 1, description: 'Car ID' })
  @ForeignKey(()=>DriverCar)
  @Column({
    type: DataType.INTEGER,
  })
  car_id: number;

  @BelongsTo(()=>DriverCar)
  driver_Car: DriverCar
}