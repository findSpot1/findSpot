import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpCode,
  UseGuards,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './models/user.model';
import { LoginUserDto } from './dto/login-user.dto';
import { Cookiegetter } from '../common/decorators/cookie_getter.decorator';
import { UserGuard } from '../common/guards/user.guard';
import { FindUserDto } from './dto/find-user.dto';
import { JwtAdminGuard } from '../common/guards/admin-auth.guard';
import { Business } from '../business/models/business.model';
import { CreateBusinessDto } from '../business/dto/create-business.dto';



@ApiTags('Client')
@Controller('client')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'registeration' })
  @ApiResponse({ status: 200, type: User })
  @Post('signup')
  registration(
    @Body() createUserDto: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.usersService.registration(createUserDto, res);
  }

  @ApiOperation({ summary: 'Activate client' })
  @ApiResponse({ status: 200, type: User })
  @Get('activate/:link')
  activate(@Param('link') link: string) {
    return this.usersService.activate(link);
  }

  // @UseGuards(UserGuard)
  @ApiOperation({ summary: 'Login' })
  @ApiResponse({ status: 200, type: User })
  @HttpCode(200)
  @Post('login')
  login(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.usersService.login(loginUserDto, res);
  }

  // @UseGuards(UserGuard)
  @ApiOperation({ summary: 'Logout' })
  @ApiResponse({ status: 200, type: User })
  @HttpCode(200)
  @Post('logout')
  logout(
    @Cookiegetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.usersService.logout(refreshToken, res);
  }

  // @UseGuards(UserGuard)
  @ApiOperation({ summary: 'Refresh token' })
  @ApiResponse({ status: 200, type: User })
  @HttpCode(200)
  @Post(':id/refresh')
  refresh(
    @Param('id') id: number,
    @Cookiegetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.usersService.refreshToken(+id, refreshToken, res);
  }

  // @UseGuards(UseGuards)
  @ApiOperation({ summary: 'Get client by id' })
  @ApiResponse({ status: 200, type: User })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findUserById(+id);
  }

  // @UseGuards(JwtAdminGuard)
  @ApiOperation({ summary: 'Get all clients' })
  @ApiResponse({ status: 200, type: [User] })
  @Get()
  findAll() {
    return this.usersService.findAllUsers();
  }

  // @UseGuards(UserGuard)
  @ApiOperation({
    summary: 'Get client by full_name, email, phone, social_media',
  })
  @ApiResponse({ status: 200, type: User })
  @Get('find')
  findUser(@Body() finduserDto: FindUserDto) {
    return this.usersService.findUser(finduserDto);
  }

  // @UseGuards(JwtAdminGuard)
  @UseGuards(UserGuard)
  @ApiOperation({ summary: 'Update client by id' })
  @ApiResponse({ status: 200, type: User })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(+id, updateUserDto);
  }

  // @UseGuards(JwtAdminGuard)
  // @UseGuards(UserGuard)
  @ApiOperation({ summary: 'Delete client by id' })
  @ApiResponse({ status: 200, type: Number })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.removeUser(+id);
  }

  @ApiOperation({ summary: 'Count of followers' })
  @ApiResponse({ status: 200, type: Number })
  @Get(':followers')
  countFollowers() {
    return this.usersService.followers();
  }

  @ApiOperation({ summary: 'Add new Business by User' })
  @ApiResponse({ status: 200, type: Business })
  @Post(':id/addBusiness')
  addBusiness(
    @Body() createBusinessDto: CreateBusinessDto,
    @Res({ passthrough: true }) res: Response,
    @Param('id') id: string,
  ) {
    return this.usersService.addBusiness(+id, createBusinessDto, res);
  }
}
