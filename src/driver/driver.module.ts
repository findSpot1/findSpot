import { Module } from '@nestjs/common';
import { DriverService } from './driver.service';
import { DriverController } from './driver.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Driver } from './model/driver.model';

@Module({
  imports: [SequelizeModule.forFeature([Driver])],
  controllers: [DriverController],
  providers: [DriverService],
  exports: [DriverService]
})
export class DriverModule {}
