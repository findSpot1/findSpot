import { Module } from '@nestjs/common';
import { BusinessImagesService } from './business_images.service';
import { BusinessImagesController } from './business_images.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { BusinessImage } from './model/business_image.model';
import { JwtService } from '@nestjs/jwt';
import { BusinessModule } from '../business/business.module';

@Module({
  imports:[SequelizeModule.forFeature([BusinessImage])],
  controllers: [BusinessImagesController],
  providers: [BusinessImagesService, JwtService],
  exports: [BusinessImagesService]
})
export class BusinessImagesModule {}
