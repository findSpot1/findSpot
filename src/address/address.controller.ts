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
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Address } from './model/address.model';
import { JwtAdminGuard } from '../common/guards/admin-auth.guard';

@ApiTags('Address')
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  // @UseGuards(JwtAdminGuard)
  @ApiOperation({ summary: 'Create a new address' })
  @ApiResponse({ status: 200, type: Address })
  @Post()
  async createAdress(@Body() createAddressDto: CreateAddressDto) {
    try {
      return this.addressService.create(createAddressDto);
    } catch (error) {
      return error;
    }
  }

  // @UseGuards(JwtAdminGuard)
  @ApiOperation({ summary: 'Get all address' })
  @ApiResponse({ status: 200, type: [Address] })
  @Get()
  async findAllAdress() {
    try {
      return this.addressService.findAll();
    } catch (error) {
      return error;
    }
  }

  // @UseGuards(JwtAdminGuard)
  @ApiOperation({ summary: 'Get address by id' })
  @ApiResponse({ status: 200, type: Address })
  @Get(':id')
  async findOneAdress(@Param('id') id: string) {
    try {
      return this.addressService.findOne(+id);
    } catch (error) {
      return error;
    }
  }

  // @UseGuards(JwtAdminGuard)
  @ApiOperation({ summary: 'Update address by id' })
  @ApiResponse({ status: 200, type: Address })
  @Patch(':id')
  async updateAdress(
    @Param('id') id: string,
    @Body() updateAddressDto: UpdateAddressDto,
  ) {
    try {
      return this.addressService.update(+id, updateAddressDto);
    } catch (error) {
      return error;
    }
  }
  // @UseGuards(JwtAdminGuard)
  @ApiOperation({ summary: 'Delete address by id' })
  @ApiResponse({ status: 200, type: Number })
  @Delete(':id')
  async removeAdress(@Param('id') id: string) {
    try {
      return this.addressService.remove(+id);
    } catch (error) {
      return error;
    }
  }
}
