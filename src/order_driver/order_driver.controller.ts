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
import { OrderDriversService } from './order_driver.service';
import { OrderDriver } from './model/order_driver.model';
import { CreateOrderDriverDto } from './dto/create-order_driver.dto';
import { UpdateOrderDriverDto } from './dto/update-order_driver.dto';

@ApiTags('OrderDriver')
@Controller('order_driver')
export class OrderDriversController {
  constructor(private readonly orderDriversService: OrderDriversService) {}

  //OrderDriver da driver uchun alohida refreshToken lar qilib ya'ni guard yozib chiqishimiz kerak


  // @UseGuards(UserGuard)
  @ApiOperation({ summary: ' Create a order_driver' })
  @ApiResponse({ status: 200, type: OrderDriver })
  @Post()
  async create(@Body() createOrderDriverDto: CreateOrderDriverDto) {
    try {
      return await this.orderDriversService.create(createOrderDriverDto);
    } catch (error) {
      return error;
    }
  }

  // @UseGuards(UserGuard)
  @ApiOperation({ summary: ' Get all order_driver' })
  @ApiResponse({ status: 200, type: [OrderDriver] })
  @Get()
  async findAll() {
    try {
      return await this.orderDriversService.findAll();
    } catch (error) {
      return error;
    }
  }
  // @UseGuards(UserGuard)
  @ApiOperation({ summary: ' Get order_driver by id' })
  @ApiResponse({ status: 200, type: OrderDriver })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.orderDriversService.findOne(+id);
    } catch (error) {
      return error;
    }
  }

  // @UseGuards(UserGuard)
  @ApiOperation({ summary: 'Update order_driver by id' })
  @ApiResponse({ status: 200, type: OrderDriver })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateOrderDriverDto: UpdateOrderDriverDto,
  ) {
    return await this.orderDriversService.update(+id, updateOrderDriverDto);
  }

  // @UseGuards(UserGuard)
  @ApiOperation({ summary: 'Delete order_driver by id' })
  @ApiResponse({ status: 200, type: Number })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.orderDriversService.remove(+id);
    } catch (error) {
      throw error;
    }
  }
}
