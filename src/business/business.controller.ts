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
import { BusinessService } from './business.service';
import { CreateBusinessDto } from './dto/create-business.dto';
import { UpdateBusinessDto } from './dto/update-business.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Business } from './models/business.model';
import { JwtAdminGuard } from '../common/guards/admin-auth.guard';
import { UserGuard } from '../common/guards/user.guard';
import { log } from 'console';
import { ProductOrService } from '../product_or_service/models/product_or_service.model';
import { BusinessImage } from '../business_images/model/business_image.model';
import { CreateBusinessImageDto } from '../business_images/dto/create-business_image.dto';

@ApiTags('Business')
@Controller('business')
export class BusinessController {
  constructor(private readonly businessService: BusinessService) {}

  // @UseGuards(JwtAdminGuard)
  @ApiOperation({ summary: 'Create a new business' })
  @ApiResponse({ status: 200, type: Business })
  @Post()
  async createBusiness(@Body() createBusinessDto: CreateBusinessDto) {
    try {
      return this.businessService.create(createBusinessDto);
    } catch (error) {
      throw error.message;
    }
  }

  @ApiOperation({ summary: 'Get all business' })
  @ApiResponse({ status: 200, type: [Business] })
  @Get()
  async findAllBusiness() {
    try {
      console.log('Salom Controller');
      return this.businessService.findAll();
    } catch (error) {
      throw error.message;
    }
  }

  @ApiOperation({ summary: 'Get all business by location' })
  @ApiResponse({ status: 200, type: [Business] })
  @Get()
  async findAllBusinessByLocation(
    @Query('location') location: string,
  ): Promise<Business[]> {
    try {
      const natija = this.businessService.findByLocation(location);
      return natija;
    } catch (error) {
      throw error.message;
    }
  }

  @ApiOperation({ summary: 'Find mostBrend business' })
  @ApiResponse({ status: 200, type: [Business] })
  @Get('mostbrend')
  async getMostBrend(): Promise<Business[]> {
    try {
      return this.businessService.mostBrend();
    } catch (error) {
      return error;
    }
  }

  // @UseGuards(JwtAdminGuard)

  @ApiOperation({ summary: 'Get business by id' })
  @ApiResponse({ status: 200, type: Business })
  @Get(':id')
  async findOneBusiness(@Param('id') id: string) {
    try {
      return this.businessService.findOne(+id);
    } catch (error) {
      throw error.message;
    }
  }

  // @UseGuards(UserGuard)
  @ApiOperation({ summary: 'Update business by id' })
  @ApiResponse({ status: 200, type: Business })
  @Patch(':id')
  async updateBusiness(
    @Param('id') id: string,
    @Body() updateBusinessDto: UpdateBusinessDto,
  ) {
    return this.businessService.update(+id, updateBusinessDto);
  }

  // @UseGuards(UserGuard)
  @ApiOperation({ summary: 'Delete business by id' })
  @ApiResponse({ status: 200, type: Number })
  @Delete(':id')
  async removeBusiness(@Param('id') id: string) {
    return this.businessService.remove(+id);
  }

  // @UseGuards(UserGuard)
  @ApiOperation({ summary: 'Add new image to business' })
  @ApiResponse({ status: 200, type: Number })
  @Post('addImage')
  async addBusinessImage(
    @Body() createBusinessImageDto: CreateBusinessImageDto,
  ) {
    try {
      return this.businessService.addImageToBusiness(createBusinessImageDto);
    } catch (error) {
      throw error;
    }
  }

  @ApiOperation({ summary: "Find business' fullMenu" })
  @ApiResponse({ status: 200, type: [Business] })
  @Get(':id/fullMenu')
  async getFullMenu(
    @Param('id') businessId: number,
  ): Promise<ProductOrService[]> {
    return this.businessService.fullMenu(businessId);
  }

  @ApiOperation({ summary: 'Increase business like by id' })
  @ApiResponse({ status: 200, type: Number })
  @Patch(':id/like')
  async increaseLike(@Param('id') id: string) {
    try {
      return this.businessService.increaseLike(+id);
    } catch (error) {
      throw error.message;
    }
  }

  @ApiOperation({ summary: "Find business' all photos" })
  @ApiResponse({ status: 200, type: [Business] })
  @Get(':id/seeAllPhotos')
  async getAllPhotos(@Param('id') id: string): Promise<BusinessImage[]> {
    try {
      return this.businessService.seeAllPhotos(+id);
    } catch (error) {
      return error;
    }
  }
}

