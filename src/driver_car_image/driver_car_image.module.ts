import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { DriverCarImage } from './model/driver_car_image.model';
import { DriverCarImagesController } from './driver_car_image.controller';
import { DriverCarImagesService } from './driver_car_image.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([DriverCarImage]),JwtModule],
  controllers: [DriverCarImagesController],
  providers: [DriverCarImagesService],
})
export class DriverCarImageModule {}
