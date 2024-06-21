import { Module } from '@nestjs/common';
import { SmallCategoryService } from './small_category.service';
import { SmallCategoryController } from './small_category.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { SmallCategory } from './models/small_category.model';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([SmallCategory]),JwtModule],
  controllers: [SmallCategoryController],
  providers: [SmallCategoryService,JwtService],
  exports: [SmallCategoryService],
})
export class SmallCategoryModule {}
