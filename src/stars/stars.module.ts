import { StarsController } from './stars.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Stars } from './models/star.model';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { BusinessModule } from '../business/business.module';
import { Module } from '@nestjs/common';
import { StarsService } from './stars.service';
import { Business } from '../business/models/business.model';

@Module({
  imports: [SequelizeModule.forFeature([Stars,Business]),JwtModule,BusinessModule],
  controllers: [StarsController],
  providers: [StarsService,JwtService],
})
export class StarsModule {}

