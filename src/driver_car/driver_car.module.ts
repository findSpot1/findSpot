import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { DriverCar } from './model/driver_car.model';
import { DriverCarsService } from './driver_car.service';
import { DriverCarsController } from './driver_car.controller';

@Module({
  imports: [SequelizeModule.forFeature([DriverCar])],
  controllers: [DriverCarsController],
  providers: [DriverCarsService],
})
export class DriverCarModule {}
