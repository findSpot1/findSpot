import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBusinessDto } from './dto/create-business.dto';
import { UpdateBusinessDto } from './dto/update-business.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Business } from './models/business.model';
import { BusinessImagesService } from '../business_images/business_images.service';
import { Sequelize } from 'sequelize-typescript';
import { ProductOrService } from '../product_or_service/models/product_or_service.model';
import { BusinessImage } from '../business_images/model/business_image.model';
import { CreateBusinessImageDto } from '../business_images/dto/create-business_image.dto';
import { Stars } from '../stars/models/star.model';

const moment = require('moment');
@Injectable()
export class BusinessService {
  constructor(
    @InjectModel(Business) private readonly businessRepo: typeof Business,
    private readonly businessImageService: BusinessImagesService,
    private readonly sequelize: Sequelize,
  ) {}
  async create(createBusinessDto: CreateBusinessDto) {
    try {
      return await this.businessRepo.create(createBusinessDto);
    } catch (error) {
      return error.message;
    }
  }

  async findAll() {
    try {
      const data = await this.businessRepo.findAll({ include: { all: true } });

      return data;
    } catch (error) {
      return error.message;
    }
  }

  async findOne(id: number) {
    try {
      const data = await this.businessRepo.findByPk(id, {
        include: { all: true },
      });

      return data;
    } catch (error) {
      return error;
    }
  }

  async update(id: number, updateBusinessDto: UpdateBusinessDto) {
    try {
      const check = this.findOne(id);
      if (!check) {
        throw new NotFoundException(`Business with ID ${id} not found`);
      }
      const upBusiness = await this.businessRepo.update(updateBusinessDto, {
        where: { id: id },
        returning: true,
      });
      return upBusiness;
    } catch (error) {
      throw error.message;
    }
  }

  async remove(id: number) {
    try {
      const check = this.findOne(id);
      if (!check) {
        throw new NotFoundException(`Business with ID ${id} not found`);
      }
      const deletedBusiness = await this.businessRepo.destroy({
        where: { id },
      });
      return deletedBusiness;
    } catch (error) {
      throw error;
    }
  }

  async getBusinessByName(name) {
    try {
      const business = await Business.findOne({ where: { name } });
      if (business) {
        console.log('Business found:', business.toJSON());
        return business;
      } else {
        console.log('Business not found');
        return null;
      }
    } catch (error) {
      console.error('Error fetching business:', error);
    }
  }

  async addImageToBusiness(
    createBusinessImageDto: CreateBusinessImageDto,
  ): Promise<object> {
    try {
      const business = await this.businessRepo.findByPk(
        createBusinessImageDto.business_id,
      );
      if (!business) {
        throw new NotFoundException(
          `Business with ID ${createBusinessImageDto.business_id} not found`,
        );
      }
      const businessImage = await this.businessImageService.create(
        createBusinessImageDto,
      );

      return businessImage;
    } catch (error) {
      console.error('Error adding image:', error);
    }
  }
  async findByLocation(location): Promise<Business[]> {
    try {
      const business = await Business.findAll({
        where: { location: location },
      });
      if (business) {
        console.log('Business found:', business);
        return business;
      }
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async fullMenu(businessId: number): Promise<ProductOrService[]> {
    const business = await this.findOne(businessId);
    return business.product_or_service;
  }

  async mostBrend(): Promise<Business[]> {
    return this.businessRepo.findAll({
      order: [
        ['average_star', 'DESC'], // Yulduzlar bo'yicha saralash
        ['likes', 'DESC'], //Likelar bo'yicha saralash
      ],
      limit: 10,
      include: [
        'business_image',
        'product_or_service',
        'workTime',
        'commentary',
      ],
    });
  }

  async increaseLike(id) {
    const business = await this.businessRepo.findByPk(id);
    if (!business) {
      throw new NotFoundException(`Business with ID ${id} not found`);
    }
    const upBusiness = await this.businessRepo.update(
      { likes: business.likes + 1 },
      {
        where: { id: id },
        returning: true,
      },
    );
    return upBusiness;
  }
  async seeAllPhotos(id): Promise<BusinessImage[]> {
    const business = await this.businessRepo.findByPk(id);
    if (!business) {
      throw new NotFoundException(`Business with ID ${id} not found`);
    }
    return business.business_image;
  }
  
}
