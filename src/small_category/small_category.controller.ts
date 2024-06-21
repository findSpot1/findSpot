import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { SmallCategoryService } from './small_category.service';
import { CreateSmallCategoryDto } from './dto/create-small_category.dto';
import { UpdateSmallCategoryDto } from './dto/update-small_category.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SmallCategory } from './models/small_category.model';
import { JwtAdminGuard } from '../common/guards/admin-auth.guard';

@ApiTags('Small-Category')
@Controller('small-category')
export class SmallCategoryController {
  constructor(private readonly smallCategoryService: SmallCategoryService) {}

  // @UseGuards(JwtAdminGuard)
  @ApiOperation({ summary: 'Create a new Small Category' })
  @ApiResponse({ status: 200, type: SmallCategory })
  @Post()
  async createSmallCategory(
    @Body() createSmallCategoryDto: CreateSmallCategoryDto,
  ) {
    try {
      return await this.smallCategoryService.create(createSmallCategoryDto);
    } catch (error) {
      return error;
    }
  }

  // @UseGuards(JwtAdminGuard)
  @ApiOperation({ summary: 'Get all Small Category' })
  @ApiResponse({ status: 200, type: [SmallCategory] })
  @Get()
  async findAllSmallCategory() {
    try {
      return await this.smallCategoryService.findAll();
    } catch (error) {
      return error;
    }
  }

  @ApiOperation({ summary: 'Get Small Category by id' })
  @ApiResponse({ status: 200, type: SmallCategory })
  @Get(':id')
  async findOneSmallCategory(@Param('id') id: string) {
    try {
      return await this.smallCategoryService.findOne(+id);
    } catch (error) {
      return error;
    }
  }

  @ApiOperation({ summary: 'Update Small Category by id' })
  @ApiResponse({ status: 200, type: SmallCategory })
  @Patch(':id')
  async updateSmallCategory(
    @Param('id') id: string,
    @Body() updateSmallCategoryDto: UpdateSmallCategoryDto,
  ) {
    try {
      return await this.smallCategoryService.update(
        +id,
        updateSmallCategoryDto,
      );
    } catch (error) {
      return error;
    }
  }

  @ApiOperation({ summary: 'Delete Small Category by id' })
  @ApiResponse({ status: 200, type: Number })
  @Delete(':id')
  async removeSmallCategory(@Param('id') id: string) {
    try {
      return await this.smallCategoryService.remove(+id);
    } catch (error) {
      return error;
    }
  }
}
