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
import { DriverCarImage } from './model/driver_car_image.model';
import { CreateDriverCarImageDto } from './dto/create-driver_car_image.dto';
import { UpdateDriverCarImageDto } from './dto/update-driver_car_image.dto';
import { DriverCarImagesService } from './driver_car_image.service';

@ApiTags('DriverCarImage')
@Controller('driver_car_images')
export class DriverCarImagesController {
  constructor(
    private readonly driverCarImagesService: DriverCarImagesService,
  ) {}

  @ApiOperation({ summary: ' Create a Car image' })
  @ApiResponse({ status: 200, type: DriverCarImage })
  @Post()
  async createCarImage(
    @Body() createDriverCarImageDto: CreateDriverCarImageDto,
  ) {
    try {
      return await this.driverCarImagesService.create(createDriverCarImageDto);
    } catch (error) {
      return error;
    }
  }

  @ApiOperation({ summary: ' Get all Car image' })
  @ApiResponse({ status: 200, type: [DriverCarImage] })
  @Get()
  async findAllCarImage() {
    try {
      return await this.driverCarImagesService.findAll();
    } catch (error) {
      return error;
    }
  }
  @ApiOperation({ summary: ' Get Car image by id' })
  @ApiResponse({ status: 200, type: DriverCarImage })
  @Get(':id')
  async findCarImageByID(@Param('id') id: string) {
    try {
      return await this.driverCarImagesService.findOne(+id);
    } catch (error) {
      return error;
    }
  }

  @ApiOperation({ summary: 'Update Car image by id' })
  @ApiResponse({ status: 200, type: DriverCarImage })
  @Patch(':id')
  async updateCarImage(
    @Param('id') id: string,
    @Body() updateDriverCarImageDto: UpdateDriverCarImageDto,
  ) {
    return await this.driverCarImagesService.update(
      +id,
      updateDriverCarImageDto,
    );
  }

  // @UseGuards(UserGuard)
  @ApiOperation({ summary: 'Delete Car image by id' })
  @ApiResponse({ status: 200, type: Number })
  @Delete(':id')
  async removeCarImage(@Param('id') id: string) {
    try {
      return await this.driverCarImagesService.remove(+id);
    } catch (error) {
      throw error;
    }
  }
}
