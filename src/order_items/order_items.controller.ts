import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderItemsService } from './order_items.service';
import { CreateOrderItemDto } from './dto/create-order_item.dto';
import { UpdateOrderItemDto } from './dto/update-order_item.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OrderItem } from './model/order_item.model';

@ApiTags('Order_items')
@Controller('order-items')
export class OrderItemsController {
  constructor(private readonly orderItemsService: OrderItemsService) {}

  // @UseGuards(JwtAdminGuard)
  @ApiOperation({ summary: 'Create a new Order Item' })
  @ApiResponse({ status: 200, type: OrderItem })
  @Post()
  async create(
    @Body() createOrderItemDto: CreateOrderItemDto,
  ): Promise<OrderItem> {
    try {
      return this.orderItemsService.create(createOrderItemDto);
    } catch (error) {
      throw error.message;
    }
  }
  // @UseGuards(JwtAdminGuard)
  @ApiOperation({ summary: 'Get all Order Items' })
  @ApiResponse({ status: 200, type: [OrderItem] })
  @Get()
  async findAllOrderItem(): Promise<OrderItem[]> {
    try {
      return this.orderItemsService.findAll();
    } catch (error) {
      throw error.message;
    }
  }
  // @UseGuards(JwtAdminGuard)
  @ApiOperation({ summary: 'Get Order Item by ID' })
  @ApiResponse({ status: 200, type: OrderItem })
  @Get(':id')
  async findOneByIdOrderItem(@Param('id') id: string): Promise<OrderItem> {
    try {
      return this.orderItemsService.findOneById(+id);
    } catch (error) {
      throw error.message;
    }
  }
  // @UseGuards(JwtAdminGuard)
  @ApiOperation({ summary: 'Update Order Item by ID' })
  @ApiResponse({ status: 200, type: OrderItem })
  @Patch(':id')
  async updateByIdOrderItem(
    @Param('id') id: string,
    @Body() updateOrderItemDto: UpdateOrderItemDto,
  ): Promise<OrderItem> {
    try {
      return this.orderItemsService.update(+id, updateOrderItemDto);
    } catch (error) {
      throw error.message;
    }
  }
  // @UseGuards(JwtAdminGuard)
  @ApiOperation({ summary: 'Delete Order Item by ID' })
  @ApiResponse({ status: 200, type: Number })
  @Delete(':id')
  async removeByIdOrderItem(@Param('id') id: string): Promise<void> {
    try {
      this.orderItemsService.remove(+id);
    } catch (error) {
      throw error.message;
    }
  }
}
