import { Module } from '@nestjs/common';
import { CommentaryService } from './commentary.service';
import { CommentaryController } from './commentary.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Commentary } from './models/commentary.model';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { BusinessModule } from '../business/business.module';

@Module({
  imports: [SequelizeModule.forFeature([Commentary]),JwtModule,BusinessModule],
  controllers: [CommentaryController],
  providers: [CommentaryService,JwtService],
})
export class CommentaryModule {}
