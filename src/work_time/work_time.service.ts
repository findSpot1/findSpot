import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWorkTimeDto } from './dto/create-work_time.dto';
import { UpdateWorkTimeDto } from './dto/update-work_time.dto';
import { InjectModel } from '@nestjs/sequelize';
import { WorkTime } from './models/work_time.model';

@Injectable()
export class WorkTimeService {
  constructor(
    @InjectModel(WorkTime) private readonly workTimeRepo: typeof WorkTime,
  ) {}

  async create(createWorkTimeDto: CreateWorkTimeDto) {
    try {
      return await this.workTimeRepo.create(createWorkTimeDto);
    } catch (error) {
      throw error.message;
    }
  }

  async findAll() {
    try {
      return await this.workTimeRepo.findAll();
    } catch (error) {
      throw error.message;
    }
  }

  async findOne(id: number) {
    try {
      return await this.workTimeRepo.findByPk(id);
    } catch (error) {
      throw error.message;
    }
  }

  async update(id: number, updateWorkTimeDto: UpdateWorkTimeDto) {
    try {
      const check = await this.findOne(id);
      if (!check) throw new NotFoundException(`WorkTime ${id} not found`);
      return await this.workTimeRepo.update(updateWorkTimeDto, {
        where: { id: id },
        returning: true,
      });
    } catch (error) {
      throw error.message;
    }
  }

  async remove(id: number) {
    try {
      const check = await this.findOne(id);
      if (!check) throw new NotFoundException(`WorkTime ${id} not found`);
      return await this.workTimeRepo.destroy({
        where: { id: id },
      });
    } catch (error) {
      throw error.message;
    }
  }

  async findOneByBusinesID(id: number) {
    try {
      return await this.workTimeRepo.findOne({
        where: { business_id: id },
      });
    } catch (error) {
      throw error.message;
    }
  }



}
