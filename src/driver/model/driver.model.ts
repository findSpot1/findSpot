import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { DriverCar } from "../../driver_car/model/driver_car.model";
import { OrderDriver } from "../../order_driver/model/order_driver.model";

interface IDriverCreationAttr {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone: string;
  passportID: string;
  card_number: string;
  refresh_token: string;
}

@Table({ tableName: 'Driver' })
export class Driver extends Model<Driver, IDriverCreationAttr> {
  @ApiProperty({ example: 1, description: 'Driver ID' })
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
  })
  id: number;

  @ApiProperty({ example: 'Ali', description: 'Driver first name' })
  @Column({
    type: DataType.STRING,
  })
  first_name: string;

  @ApiProperty({ example: 'Valiyev', description: 'Driver last name' })
  @Column({
    type: DataType.STRING,
  })
  last_name: string;

  @ApiProperty({ example: 'ali@gamil.com', description: 'Driver email' })
  @Column({
    type: DataType.STRING,
  })
  email: string;

  @ApiProperty({ example: '123ali', description: 'Driver email password' })
  @Column({
    type: DataType.STRING,
  })
  password: string;

  @ApiProperty({ example: 'AD012****', description: 'Driver passportID' })
  @Column({
    type: DataType.STRING,
  })
  passportID: string;

  @ApiProperty({ example: '86006214****', description: 'Driver card number' })
  @Column({
    type: DataType.STRING,
  })
  card_number: string;
  @ApiProperty({ example: "123nhik14bin21jn123im", description: 'Driver refresh_token ' })
  @Column({
    type: DataType.STRING,
  })
   refresh_token: string;

  @HasMany(() => DriverCar)
  driver_car: DriverCar[];

  @HasMany(() => OrderDriver)
  order_driver: OrderDriver[];
}
