import { Module } from '@nestjs/common';
import { ProductOrServiceService } from './product_or_service.service';
import { ProductOrServiceController } from './product_or_service.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductOrService } from './models/product_or_service.model';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([ProductOrService]),JwtModule],
  controllers: [ProductOrServiceController],
  providers: [ProductOrServiceService,JwtService],
  exports: [ProductOrServiceService],
})
export class ProductOrServiceModule {}
