import { Injectable } from '@nestjs/common';
import { DriverCar } from './model/driver_car.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateDriverCarDto } from './dto/create-driver_car.dto';
import { UpdateDriverCarDto } from './dto/update-driver_car.dto';


@Injectable()
export class DriverCarsService {
  constructor(
    @InjectModel(DriverCar)
    private readonly businesImageRepo: typeof DriverCar,
  ) {}

  async create(createDriverCarDto: CreateDriverCarDto) {
    try {
      return await this.businesImageRepo.create(createDriverCarDto);
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

  async update(id: number, updateDriverCarDto: UpdateDriverCarDto) {
    try {
      const check = await this.findOne(id);
      if (check) {
        return await this.businesImageRepo.update(updateDriverCarDto, {
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
