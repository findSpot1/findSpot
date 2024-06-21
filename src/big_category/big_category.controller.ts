import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { BigCategoryService } from './big_category.service';
import { CreateBigCategoryDto } from './dto/create-big_category.dto';
import { UpdateBigCategoryDto } from './dto/update-big_category.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BigCategory } from './models/big_category.model';
import { JwtAdminGuard } from '../common/guards/admin-auth.guard';

@ApiTags('Big-category')
@Controller('big-category')
export class BigCategoryController {
  constructor(private readonly bigCategoryService: BigCategoryService) {}

  // @UseGuards(JwtAdminGuard)
  @ApiOperation({ summary: 'Create a new Big Category' })
  @ApiResponse({ status: 200, type: BigCategory })
  @Post()
  async createBigCategory(@Body() createBigCategoryDto: CreateBigCategoryDto) {
    try {
      return await this.bigCategoryService.create(createBigCategoryDto);
    } catch (error) {
      return error.message;
    }
  }

  @UseGuards(JwtAdminGuard)
  @ApiOperation({ summary: 'Get all Big Categories' })
  @ApiResponse({ status: 200, type: [BigCategory] })
  @Get()
  async findAllBigCategory() {
    try {
      return await this.bigCategoryService.findAll();
    } catch (error) {
      return error.message;
    }
  }

  @UseGuards(JwtAdminGuard)
  @ApiOperation({ summary: 'Get one Big Category' })
  @ApiResponse({ status: 200, type: BigCategory })
  @Get(':id')
  async findOneBigCategory(@Param('id') id: string) {
    try {
      return await this.bigCategoryService.findOne(+id);
    } catch (error) {
      return error.message;
    }
  }

  // @UseGuards(JwtAdminGuard)
  @ApiOperation({ summary: 'Get one Big Category by name' })
  @ApiResponse({ status: 200, type: BigCategory })
  @Get(':/name')
  async findBigCategoryByName(
    @Query('name') name: string,
  ): Promise<BigCategory> {
    try {
      return await this.bigCategoryService.findBigCategoryByName(name);
    } catch (error) {
      return error.message;
    }
  }

  @UseGuards(JwtAdminGuard)
  @ApiOperation({ summary: 'Update a Big Category' })
  @ApiResponse({ status: 200, type: BigCategory })
  @Patch(':id')
  async updateBigCategory(
    @Param('id') id: string,
    @Body() updateBigCategoryDto: UpdateBigCategoryDto,
  ) {
    try {
      return await this.bigCategoryService.update(+id, updateBigCategoryDto);
    } catch (error) {
      return error.message;
    }
  }

  @UseGuards(JwtAdminGuard)
  @ApiOperation({ summary: 'Delete a Big Category' })
  @ApiResponse({ status: 200, type: Number })
  @Delete(':id')
  async removeBigCategory(@Param('id') id: string) {
    try {
      return await this.bigCategoryService.remove(+id);
    } catch (error) {
      return error.message;
    }
  }
}
