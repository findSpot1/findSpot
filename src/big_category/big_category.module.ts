import { Module } from '@nestjs/common';
import { BigCategoryService } from './big_category.service';
import { BigCategoryController } from './big_category.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { BigCategory } from './models/big_category.model';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([BigCategory]),JwtModule],
  controllers: [BigCategoryController],
  providers: [BigCategoryService,JwtService],
  exports: [BigCategoryService],
})
export class BigCategoryModule {}
