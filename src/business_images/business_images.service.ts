import { Injectable } from '@nestjs/common';
import { CreateBusinessImageDto } from './dto/create-business_image.dto';
import { UpdateBusinessImageDto } from './dto/update-business_image.dto';
import { InjectModel } from '@nestjs/sequelize';
import { BusinessImage } from './model/business_image.model';

@Injectable()
export class BusinessImagesService {
  constructor(@InjectModel(BusinessImage) private readonly businesImageRepo: typeof BusinessImage ){}

  async create(createBusinessImageDto: CreateBusinessImageDto) {
    try {
      return await this.businesImageRepo.create(createBusinessImageDto);
    } catch (error) {
      throw error.message;
    }
  }
  
  async findAll() {
    try {
      return await this.businesImageRepo.findAll({ include: { all: true } });
    } catch (error) {
      throw error.message;
    }
  }

  async findOne(id: number) {
    try {
      return await this.businesImageRepo.findByPk(id, {
        include: { all: true },
      });
    } catch (error) {
      throw error.message;
    }
  }

  async update(id: number, updateBusinessImageDto: UpdateBusinessImageDto) {
    try {
      const check = await this.findOne(id)
      if (check) {
        return await this.businesImageRepo.update(updateBusinessImageDto, {
          where: { id: id },
        });
      } else {
        throw new Error('Not Found');
      }
    } catch (error) {
      throw error.message;
    }
  }
  
  async remove(id: number) {
    try {
      const check = await this.findOne(id)
      if (check) {
        return await this.businesImageRepo.destroy({ where: { id: id } });
      } else {
        throw new Error('Not Found');
      }
    } catch (error) {
      throw error.message;
    }
  }
}
