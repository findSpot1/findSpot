import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStarDto } from './dto/create-star.dto';
import { UpdateStarDto } from './dto/update-star.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Stars } from './models/star.model';
import { BusinessService } from '../business/business.service';
import { log } from 'console';
import { FLOAT } from 'sequelize';
import { Business } from '../business/models/business.model';

@Injectable()
export class StarsService {
  constructor(
    @InjectModel(Stars) private readonly starRepo: typeof Stars,
    private readonly businessService: BusinessService,
    @InjectModel(Business) private readonly businessRepo: typeof Business,
  ) {}

  async create(createStarDto: CreateStarDto) {
    try {
      const stars = await this.starRepo.create(createStarDto);
      const business = await this.businessService.findOne(
        createStarDto.business_id,
      );
      let sum = 0;
      for (let i = 0; i < business.stars.length; i++) {
        sum = sum + business.stars[i].star;
      }
      console.log('Summa --> ', sum);
      console.log('Stars.length --> ', business.stars.length);
      const avg = Math.round(sum / business.stars.length);
      console.log(
        'sum / business.stars.length --> ',
        sum / business.stars.length,
      );
      await this.businessRepo.update(
        { average_star: avg },
        { where: { id: business.id } },
      );

      await business.save();
      return business.stars;
    } catch (error) {
      throw error.message;
    }
  }

  async findAll() {
    try {
      return await this.starRepo.findAll({ include: { all: true } });
    } catch (error) {
      throw error.message;
    }
  }

  async findOne(id: number) {
    try {
      return await this.starRepo.findByPk(id);
    } catch (error) {
      throw error.message;
    }
  }

  async update(id: number, updateStarDto: UpdateStarDto) {
    try {
      const check = await this.findOne(id);
      if (!check) throw new NotFoundException(`Star ${id} not found`);
      return await this.starRepo.update(updateStarDto, {
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
      if (!check) throw new NotFoundException(`Star ${id} not found`);
      return await this.starRepo.destroy({ where: { id } });
    } catch (error) {
      throw error.message;
    }
  }
}
