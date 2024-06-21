import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
// import { User } from './user.model';
import { MailModule } from '../mail/mail.module';
import { User } from './models/user.model';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { BusinessModule } from '../business/business.module';

@Module({
  imports: [
    SequelizeModule.forFeature([User]),
    JwtModule.register({}),
    MailModule,
    BusinessModule
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports:[UsersService]
})
export class UsersModule {}
