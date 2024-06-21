import { Injectable } from '@nestjs/common';
import { CreateSmallCategoryDto } from './dto/create-small_category.dto';
import { UpdateSmallCategoryDto } from './dto/update-small_category.dto';
import { InjectModel } from '@nestjs/sequelize';
import { SmallCategory } from './models/small_category.model';

@Injectable()
export class SmallCategoryService {
  constructor(
    @InjectModel(SmallCategory)
    private readonly smalCategoryRepo: typeof SmallCategory,
  ) {}

  async create(createSmallCategoryDto: CreateSmallCategoryDto) {
    try {
      return await this.smalCategoryRepo.create(createSmallCategoryDto);
    } catch (error) {
      throw error.message;
    }
  }

  async findAll() {
    try {
      return await this.smalCategoryRepo.findAll({ include: { all: true } });
    } catch (error) {
      throw error.message;
    }
  }

  async findOne(id: number) {
    try {
      return await this.smalCategoryRepo.findByPk(id, {
        include: { all: true },
      });
    } catch (error) {
      throw error.message;
    }
  }

  async update(id: number, updateSmallCategoryDto: UpdateSmallCategoryDto) {
    try {
      const check = await this.findOne(id);
      if (!check) throw new Error('No such small category exists');
      return await this.smalCategoryRepo.update(updateSmallCategoryDto, {
        where: { id: id },
      });
    } catch (error) {
      throw error.message;
    }
  }

  async remove(id: number) {
    try {
      const check = await this.findOne(id);
      if (!check) throw new Error('No such small category exists');
      return await this.smalCategoryRepo.destroy({ where: { id } });
    } catch (error) {}
  }
}
