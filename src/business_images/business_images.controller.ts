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
import { BusinessImagesService } from './business_images.service';
import { CreateBusinessImageDto } from './dto/create-business_image.dto';
import { UpdateBusinessImageDto } from './dto/update-business_image.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BusinessImage } from './model/business_image.model';
import { UserGuard } from '../common/guards/user.guard';

@ApiTags('BusinessImage')
@Controller('business_images')
export class BusinessImagesController {
  constructor(private readonly businessImagesService: BusinessImagesService) {}

  @ApiOperation({ summary: ' Create a business image' })
  @ApiResponse({ status: 200, type: BusinessImage })
  @Post()
  async create(@Body() createBusinessImageDto: CreateBusinessImageDto) {
    try {
      return await this.businessImagesService.create(createBusinessImageDto);
    } catch (error) {
      return error;
    }
  }

  @ApiOperation({ summary: ' Get all business image' })
  @ApiResponse({ status: 200, type: [BusinessImage] })
  @Get()
  async findAll() {
    try {
      return await this.businessImagesService.findAll();
    } catch (error) {
      return error;
    }
  }
  @ApiOperation({ summary: ' Get business image by id' })
  @ApiResponse({ status: 200, type: BusinessImage })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.businessImagesService.findOne(+id);
    } catch (error) {
      return error;
    }
  }

  @ApiOperation({ summary: 'Update business image by id' })
  @ApiResponse({ status: 200, type: BusinessImage })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBusinessImageDto: UpdateBusinessImageDto,
  ) {
    return await this.businessImagesService.update(+id, updateBusinessImageDto);
  }

  // @UseGuards(UserGuard)
  @ApiOperation({ summary: 'Delete business image by id' })
  @ApiResponse({ status: 200, type: Number })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.businessImagesService.remove(+id);
    } catch (error) {
      throw error;
    }
  }
}
