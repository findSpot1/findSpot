import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductOrServiceDto } from './dto/create-product_or_service.dto';
import { UpdateProductOrServiceDto } from './dto/update-product_or_service.dto';
import { InjectModel } from '@nestjs/sequelize';
import { ProductOrService } from './models/product_or_service.model';

@Injectable()
export class ProductOrServiceService {
  constructor(
    @InjectModel(ProductOrService)
    private readonly productOrServiceRepo: typeof ProductOrService,
  ) {}

  async create(createProductOrServiceDto: CreateProductOrServiceDto) {
    try {
      return await this.productOrServiceRepo.create(createProductOrServiceDto);
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      return await this.productOrServiceRepo.findAll({
        include: { all: true },
      });
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number): Promise<ProductOrService> {
    try {
      return await this.productOrServiceRepo.findByPk(id, {
        include: { all: true },
      });
    } catch (error) {
      throw error;
    }
  }

  async findProductByName(name) {
    try {
      const product = await this.productOrServiceRepo.findOne({
        where: { name },
      });
      if (product) {
        console.log('Product found:', product.toJSON());
        return product;
      } else {
        console.log('Product not found');
        return null;
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  }

  async findProductByPrice(price) {
    try {
      const product = await this.productOrServiceRepo.findOne({
        where: { price },
      });
      if (product) {
        console.log('Product found:', product.toJSON());
        return product;
      } else {
        console.log('Product not found');
        return null;
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  }

  async update(
    id: number,
    updateProductOrServiceDto: UpdateProductOrServiceDto,
  ) {
    try {
      const check = this.findOne(id);
      if (!check)
        throw new NotFoundException(`Product with ${id}-id not found`);
      return await this.productOrServiceRepo.update(updateProductOrServiceDto, {
        where: { id: id },
      });
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const check = this.findOne(id);
      if (!check)
        throw new NotFoundException(`Product with ${id}-id not found`);
      return await this.productOrServiceRepo.destroy({ where: { id: id } });
    } catch (error) {
      throw error;
    }
  }

  async findProductByAmountSelling() {
    try {
      const product = await this.productOrServiceRepo.findAll({
        include: { all: true },
        order: [['quantity_of_selling', 'DESC']],
      });
      if (product) {
        console.log('Product found:', product);
        return product;
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  }
  async findProductByRatingAndPrice() {
    try {
      const product = await this.productOrServiceRepo.findAll({
        include: { all: true },
        order: [
          ['rating', 'DESC'],
          ['price', 'DESC'],
        ],
      });
      if (product) {
        console.log('Product found:', product);
        return product;
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  }
  async findProductByRatingAndAmountSelling() {
    try {
      const product = await this.productOrServiceRepo.findAll({
        include: { all: true },
        order: [
          ['rating', 'DESC'],
          ['quantity_of_orders', 'DESC'],
        ],
      });
      if (product) {
        console.log('Product found:', product);
        return product;
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  }
  async addQuantityOfSelling(id, amount) {
    try {
      const product = await this.productOrServiceRepo.findByPk(id);
      if (!product) {
        console.log('Product not found');
        return;
      }
      product.quantity_of_selling = product.quantity_of_selling + amount;
      await product.save();
      return product;
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  }
}
