import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBigCategoryDto } from './dto/create-big_category.dto';
import { UpdateBigCategoryDto } from './dto/update-big_category.dto';
import { InjectModel } from '@nestjs/sequelize';
import { BigCategory } from './models/big_category.model';

@Injectable()
export class BigCategoryService {
  constructor(
    @InjectModel(BigCategory) private readonly categoryRepo: typeof BigCategory,
  ) {}

  async create(createBigCategoryDto: CreateBigCategoryDto) {
    try {
      return await this.categoryRepo.create(createBigCategoryDto);
    } catch (error) {
      throw error.message;
    }
  }

  async findAll() {
    try {
      return await this.categoryRepo.findAll({ include: { all: true } });
    } catch (error) {
      return error.message;
    }
  }

  async findOne(id: number) {
    try {
      return await this.categoryRepo.findByPk(id, { include: { all: true } });
    } catch (error) {
      return error.message;
    }
  }

  async update(id: number, updateBigCategoryDto: UpdateBigCategoryDto) {
    try {
      const check = this.findOne(id);
      if (!check) {
        throw new NotFoundException(`Category with ID ${id} not found`);
      }
      return await this.categoryRepo.update(updateBigCategoryDto, {
        where: { id },
        returning: true,
      });
    } catch (error) {
      return error.message;
    }
  }

  async remove(id: number) {
    try {
      const check = this.findOne(id);
      if (!check) {
        throw new NotFoundException(`Category with ID ${id} not found`);
      }
      return await this.categoryRepo.destroy({ where: { id } });
    } catch (error) {
      return error.message;
    }
  }
  async findBigCategoryByName(name: string): Promise<BigCategory>{
    try {
      return await this.categoryRepo.findOne({
        where: { name: name },
      });
    } catch (error) {
      throw error.message;
    }
  }
}
