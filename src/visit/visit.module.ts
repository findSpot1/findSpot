import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { VisitService } from './visit.service';
import { VisitController } from './visit.controller';
import { Visit } from './model/visit.model';


@Module({
  imports: [SequelizeModule.forFeature([Visit])],
  providers: [VisitService],
  controllers: [VisitController],
  exports: [VisitService]
})
export class VisitModule {}
