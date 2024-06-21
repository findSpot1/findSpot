import { Injectable } from '@nestjs/common';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Driver } from './model/driver.model';

@Injectable()
export class DriverService {
  constructor(
    @InjectModel(Driver) private readonly driverRepo: typeof Driver,
  ) {}

  async createDriver(createDriverDto: CreateDriverDto) {
    try {
      return await this.driverRepo.create(createDriverDto);
    } catch (error) {
      throw error.message;
    }
  }

  async findAllDriver() {
    try {
      return await this.driverRepo.findAll();
    } catch (error) {}
  }

  async findDriverByID(id: number) {
    try {
      return await this.driverRepo.findByPk(+id);
    } catch (error) {
      throw error.message;
    }
  }

  async findDriverByFName(firstName: string) {
    try {
      return await this.driverRepo.findOne({
        where: { first_name: firstName },
      });
    } catch (error) {
      throw error.message;
    }
  }

  async findDriverByPassport(pasport_raqam: string) {
    try {
      return await this.driverRepo.findOne({
        where: { passportID: pasport_raqam },
      });
    } catch (error) {
      throw error.message;
    }
  }

  async update(id: number, updateDriverDto: UpdateDriverDto) {
    try {
      const check = await this.findDriverByID(id);
      if (check) {
        return await this.driverRepo.update(updateDriverDto, {
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
      const check = await this.findDriverByID(id);
      if (check) {
        return await this.driverRepo.destroy({ where: { id: id } });
      } else {
        throw new Error('Not Found');
      }
    } catch (error) {
      throw error.message;
    }
  }
}
