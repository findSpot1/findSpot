import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Response } from 'express';
import { Cookiegetter } from '../common/decorators/cookie_getter.decorator';
import { LoginAdminDto } from './dto/login.admin.dto';
import { Admin } from './models/admin.model';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AdminGuard } from '../common/guards/self-admin.guard';
import { JwtAdminGuard } from '../common/guards/admin-auth.guard';
import { User } from '../users/models/user.model';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // @UseGuards(AdminGuard)
  // @UseGuards(JwtAdminGuard)
  @HttpCode(200)
  @ApiOperation({ summary: 'Registration admin' })
  @ApiResponse({ status: 200, type: Admin })
  @Post('registration')
  registration(
    @Body() createAdminDto: CreateAdminDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminService.registration(createAdminDto, res);
  }

  // @UseGuards(User)
  @HttpCode(200)
  @ApiOperation({ summary: 'Login admin' })
  @ApiResponse({ status: 200, type: Admin })
  @Post('login')
  login(
    @Body() loginUserDto: LoginAdminDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminService.login(loginUserDto, res);
  }

  // @UseGuards(User)
  @HttpCode(200)
  @ApiOperation({ summary: 'Logout admin' })
  @ApiResponse({ status: 200, type: Admin })
  @Post('logout')
  logout(
    @Cookiegetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminService.logout(refreshToken, res);
  }

  @HttpCode(200)
  @ApiOperation({ summary: 'Refresh admin by id' })
  @ApiResponse({ status: 200, type: Admin })
  @Post(':id/refresh')
  refresh(
    @Param('id') id: number,
    @Cookiegetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminService.refreshToken(+id, refreshToken, res);
  }

  // @UseGuards(AdminGuard)
  // @UseGuards(JwtAdminGuard)
  @ApiOperation({ summary: 'Get all admin' })
  @ApiResponse({ status: 200, type: [Admin] })
  @Get()
  findAll() {
    return this.adminService.findAllAdmins();
  }

  // @UseGuards(JwtAdminGuard)
  @ApiOperation({ summary: 'Get admin by id' })
  @ApiResponse({ status: 200, type: Admin })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findAdminById(+id);
  }

  // @UseGuards(AdminGuard)
  // @UseGuards(JwtAdminGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Update admin by id' })
  @ApiResponse({ status: 200, type: Admin })
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.updateAdmin(+id, updateAdminDto);
  }

  // @UseGuards(AdminGuard)
  // @UseGuards(JwtAdminGuard)
  @ApiOperation({ summary: 'Delete admin by id' })
  @ApiResponse({ status: 200, type: Number })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.removeAdmin(+id);
  }
}
