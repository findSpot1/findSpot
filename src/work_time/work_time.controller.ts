import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { WorkTimeService } from './work_time.service';
import { CreateWorkTimeDto } from './dto/create-work_time.dto';
import { UpdateWorkTimeDto } from './dto/update-work_time.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { WorkTime } from './models/work_time.model';
import { JwtAdminGuard } from '../common/guards/admin-auth.guard';

@ApiTags('Work-Time')
@Controller('work-time')
export class WorkTimeController {
  constructor(private readonly workTimeService: WorkTimeService) {}

  // @UseGuards(JwtAdminGuard)
  @ApiOperation({ summary: 'Create a new work-time' })
  @ApiResponse({ status: 200, type: WorkTime })
  @Post()
  async createWorkTime(@Body() createWorkTimeDto: CreateWorkTimeDto) {
    try {
      return this.workTimeService.create(createWorkTimeDto);
    } catch (error) {
      throw error.message;
    }
  }

  // @UseGuards(JwtAdminGuard)
  @ApiOperation({ summary: 'Get all work-time' })
  @ApiResponse({ status: 200, type: WorkTime })
  @Get()
  async findAllWorkTime() {
    try {
      return this.workTimeService.findAll();
    } catch (error) {
      throw error.message;
    }
  }

  // @UseGuards(JwtAdminGuard)
  @ApiOperation({ summary: 'Get work-time by id' })
  @ApiResponse({ status: 200, type: WorkTime })
  @Get(':id')
  async findOneWorkTime(@Param('id') id: string) {
    try {
      return this.workTimeService.findOne(+id);
    } catch (error) {
      throw error.message;
    }
  }

  // @UseGuards(JwtAdminGuard)
  @ApiOperation({ summary: 'Update work-time by id' })
  @ApiResponse({ status: 200, type: WorkTime })
  @Patch(':id')
  async updateWorkTime(
    @Param('id') id: string,
    @Body() updateWorkTimeDto: UpdateWorkTimeDto,
  ) {
    try {
      return this.workTimeService.update(+id, updateWorkTimeDto);
    } catch (error) {
      throw error.message;
    }
  }

  // @UseGuards(JwtAdminGuard)
  @ApiOperation({ summary: 'Delete work-time by id' })
  @ApiResponse({ status: 200, type: Number })
  @Delete(':id')
  async removeWorkTime(@Param('id') id: string) {
    try {
      return this.workTimeService.remove(+id);
    } catch (error) {
      throw error.message;
    }
  }
}
