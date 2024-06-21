import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { StarsService } from './stars.service';
import { CreateStarDto } from './dto/create-star.dto';
import { UpdateStarDto } from './dto/update-star.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Stars } from './models/star.model';
import { JwtAdminGuard } from '../common/guards/admin-auth.guard';

@ApiTags('Star')
@Controller('stars')
export class StarsController {
  constructor(private readonly starsService: StarsService) {}

  @ApiOperation({ summary: 'Create a new star' })
  @ApiResponse({ status: 200, type: Stars })
  @Post()
  async createStar(@Body() createStarDto: CreateStarDto) {
    try {
      return await this.starsService.create(createStarDto);
    } catch (error) {
      throw error.message;
    }
  }

  @ApiOperation({ summary: 'Get all star' })
  @ApiResponse({ status: 200, type: [Stars] })
  @Get()
  async findAllStar() {
    try {
      return await this.starsService.findAll();
    } catch (error) {
      throw error.message;
    }
  }

  @ApiOperation({ summary: 'Get star by id' })
  @ApiResponse({ status: 200, type: Stars })
  @Get(':id')
  async findOneStar(@Param('id') id: string) {
    try {
      return await this.starsService.findOne(+id);
    } catch (error) {
      throw error.message;
    }
  }

  @UseGuards(JwtAdminGuard)
  @ApiOperation({ summary: 'Update star by id' })
  @ApiResponse({ status: 200, type: Stars })
  @Patch(':id')
  async updateStar(
    @Param('id') id: string,
    @Body() updateStarDto: UpdateStarDto,
  ) {
    try {
      return await this.starsService.update(+id, updateStarDto);
    } catch (error) {
      throw error.message;
    }
  }

  // @UseGuards(JwtAdminGuard)
  @ApiOperation({ summary: 'Delete star by id' })
  @ApiResponse({ status: 200, type: Number })
  @Delete(':id')
  async removeStar(@Param('id') id: string) {
    try {
      return await this.starsService.remove(+id);
    } catch (error) {
      throw error.message;
    }
  }
}
