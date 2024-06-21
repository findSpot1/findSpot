import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { DriverCarImage } from './model/driver_car_image.model';
import { CreateDriverCarImageDto } from './dto/create-driver_car_image.dto';
import { UpdateDriverCarImageDto } from './dto/update-driver_car_image.dto';

@Injectable()
export class DriverCarImagesService {
  constructor(
    @InjectModel(DriverCarImage)
    private readonly businesImageRepo: typeof DriverCarImage,
  ) {}

  async create(createDriverCarImageDto: CreateDriverCarImageDto) {
    try {
      return await this.businesImageRepo.create(createDriverCarImageDto);
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

  async update(id: number, updateDriverCarImageDto: UpdateDriverCarImageDto) {
    try {
      const check = await this.findOne(id);
      if (check) {
        return await this.businesImageRepo.update(updateDriverCarImageDto, {
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
      const check = await this.findOne(id);
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
