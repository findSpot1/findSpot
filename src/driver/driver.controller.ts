import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DriverService } from './driver.service';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Driver } from './model/driver.model';

@ApiTags('Driver')
@Controller('driver')
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  @ApiOperation({ summary: 'Create a new driver' })
  @ApiResponse({ status: 200, type: Driver })
  @Post()
  async createDriver(@Body() createDriverDto: CreateDriverDto) {
    try {
      return await this.driverService.createDriver(createDriverDto);
    } catch (error) {
      throw error.message;
    }
  }
  @ApiOperation({ summary: 'Get all driver' })
  @ApiResponse({ status: 200, type: [Driver] })
  @Get()
  async findAllDriver() {
    try {
      return await this.driverService.findAllDriver();
    } catch (error) {
      throw error.message;
    }
  }

  @ApiOperation({ summary: 'Get driver by ID' })
  @ApiResponse({ status: 200, type: Driver })
  @Get(':id')
  async findDriverByID(@Param('id') id: string) {
    try {
      return await this.driverService.findDriverByID(+id);
    } catch (error) {
      throw error.message;
    }
  }

  @ApiOperation({ summary: 'Get driver by first name' })
  @ApiResponse({ status: 200, type: Driver })
  @Get(':first_name')
  async findDriverByFName(@Param('id') firstName: string) {
    try {
      return await this.driverService.findDriverByFName(firstName);
    } catch (error) {
      throw error.message;
    }
  }

  @ApiOperation({ summary: 'Get driver by pasport number' })
  @ApiResponse({ status: 200, type: Driver })
  @Get(':passport')
  async findDriverByPassport(@Param('id') pasport_seriya: string) {
    try {
      return await this.driverService.findDriverByPassport(pasport_seriya);
    } catch (error) {
      throw error.message;
    }
  }

  @ApiOperation({ summary: 'Update driver by ID' })
  @ApiResponse({ status: 200, type: Driver })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDriverDto: UpdateDriverDto,
  ) {
    try {
      return await this.driverService.update(+id, updateDriverDto);
    } catch (error) {
      throw error.message;
    }
  }

  @ApiOperation({ summary: 'Delete driver by ID' })
  @ApiResponse({ status: 200, type: Number })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      
      return await this.driverService.remove(+id);
    } catch (error) {
      throw error.message;
    }
  }
}
