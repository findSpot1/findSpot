import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';

import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserGuard } from '../common/guards/user.guard';
import { DriverCarsService } from './driver_car.service';
import { DriverCar } from './model/driver_car.model';
import { CreateDriverCarDto } from './dto/create-driver_car.dto';
import { UpdateDriverCarDto } from './dto/update-driver_car.dto';

@ApiTags('DriverCar')
@Controller('driver_car')
export class DriverCarsController {
  constructor(private readonly driverCarsService: DriverCarsService) {}

  @ApiOperation({ summary: ' Create a car image' })
  @ApiResponse({ status: 200, type: DriverCar })
  @Post()
  async createDriverCar(@Body() createDriverCarDto: CreateDriverCarDto) {
    try {
      return await this.driverCarsService.create(createDriverCarDto);
    } catch (error) {
      return error;
    }
  }

  @ApiOperation({ summary: ' Get all car image' })
  @ApiResponse({ status: 200, type: [DriverCar] })
  @Get()
  async findAllDriverCar() {
    try {
      return await this.driverCarsService.findAll();
    } catch (error) {
      return error;
    }
  }
  @ApiOperation({ summary: ' Get car image by id' })
  @ApiResponse({ status: 200, type: DriverCar })
  @Get(':id')
  async findOneDriverCar(@Param('id') id: string) {
    try {
      return await this.driverCarsService.findOne(+id);
    } catch (error) {
      return error;
    }
  }

  @ApiOperation({ summary: 'Update car image by id' })
  @ApiResponse({ status: 200, type: DriverCar })
  @Patch(':id')
  async updateDriverCar(
    @Param('id') id: string,
    @Body() updateDriverCarDto: UpdateDriverCarDto,
  ) {
    return await this.driverCarsService.update(+id, updateDriverCarDto);
  }

  // @UseGuards(UserGuard)
  @ApiOperation({ summary: 'Delete car image by id' })
  @ApiResponse({ status: 200, type: Number })
  @Delete(':id')
  async removeDriverCar(@Param('id') id: string) {
    try {
      return await this.driverCarsService.remove(+id);
    } catch (error) {
      throw error;
    }
  }
}
