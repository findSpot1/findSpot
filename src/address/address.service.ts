import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Address } from './model/address.model';

@Injectable()
export class AddressService {
  constructor(
    @InjectModel(Address) private readonly addressRepo: typeof Address,
  ) {}
  async create(createAddressDto: CreateAddressDto) {
    try {
      return await this.addressRepo.create(createAddressDto);
    } catch (error) {
      return error;
    }
  }

  async findAll() {
    try {
      return await this.addressRepo.findAll({ include: { all: true } });
    } catch (error) {
      return error;
    }
  }

  async findOne(id: number) {
    try {
      return await this.addressRepo.findByPk(id, { include: { all: true } });
    } catch (error) {
      return error;
    }
  }

  async update(id: number, updateAddressDto: UpdateAddressDto) {
    try {
      const check = this.findOne(id);
      if (!check) {
        throw new NotFoundException(`Address with ID ${id} not found`);
      }
      return await this.addressRepo.update(updateAddressDto, {
        where: { id: id },
      });
    } catch (error) {
      return error;
    }
  }

  async remove(id: number) {
    try {
      const check = this.findOne(id);
      if (!check) {
        throw new NotFoundException(`Address with ID ${id} not found`);
      }
      return await this.addressRepo.destroy({ where: { id } });
    } catch (error) {
      return error;
    }
  }
}
