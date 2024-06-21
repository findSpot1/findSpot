import { Module } from '@nestjs/common';
import { BusinessController } from './business.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Business } from './models/business.model';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { BusinessService } from './business.service';
import { BusinessImagesModule } from '../business_images/business_images.module'; 
import { Stars } from '../stars/models/star.model';
import { ProductOrService } from '../product_or_service/models/product_or_service.model';

@Module({
  imports: [SequelizeModule.forFeature([Business,Stars,ProductOrService]),JwtModule,BusinessImagesModule],
  controllers: [BusinessController],
  providers: [BusinessService, JwtService],
  exports: [BusinessService]
})
export class BusinessModule {}
