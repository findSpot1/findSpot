import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CommentaryService } from './commentary.service';
import { CreateCommentaryDto } from './dto/create-commentary.dto';
import { UpdateCommentaryDto } from './dto/update-commentary.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Commentary } from './models/commentary.model';
import { JwtAdminGuard } from '../common/guards/admin-auth.guard';

@ApiTags('Commentary')
@Controller('commentary')
export class CommentaryController {
  constructor(private readonly commentaryService: CommentaryService) {}

  // @UseGuards(JwtAdminGuard)
  @ApiOperation({ summary: 'Create a new comment' })
  @ApiResponse({ status: 200, type: Commentary })
  @Post()
  async createCommentary(@Body() createCommentaryDto: CreateCommentaryDto) {
    try {
      return this.commentaryService.create(createCommentaryDto);
    } catch (error) {
      throw error.message;
    }
  }

  // @UseGuards(JwtAdminGuard)
  @ApiOperation({ summary: 'Get all comment' })
  @ApiResponse({ status: 200, type: [Commentary] })
  @Get()
  async findAllCommentary() {
    try {
      return this.commentaryService.findAll();
    } catch (error) {
      throw error.message;
    }
  }

  // @UseGuards(JwtAdminGuard)
  @ApiOperation({ summary: 'Get comment by id' })
  @ApiResponse({ status: 200, type: Commentary })
  @Get(':id')
  async findOneCommentary(@Param('id') id: string) {
    try {
      return this.commentaryService.findOne(+id);
    } catch (error) {
      throw error.message;
    }
  }

  // @UseGuards(JwtAdminGuard)
  @ApiOperation({ summary: 'Update comment by id' })
  @ApiResponse({ status: 200, type: Commentary })
  @Patch(':id')
  async updateCommentary(
    @Param('id') id: string,
    @Body() updateCommentaryDto: UpdateCommentaryDto,
  ) {
    try {
      return this.commentaryService.update(+id, updateCommentaryDto);
    } catch (error) {
      throw error.message;
    }
  }

  // @UseGuards(JwtAdminGuard)
  @ApiOperation({ summary: 'Delete comment by id' })
  @ApiResponse({ status: 200, type: Number })
  @Delete(':id')
  async removeCommentary(@Param('id') id: string) {
    try {
      return this.commentaryService.remove(+id);
    } catch (error) {
      throw error.message;
    }
  }
  // @UseGuards(JwtAdminGuard)
  @ApiOperation({ summary: 'Increase like by id' })
  @ApiResponse({ status: 200, type: Number })
  @Patch(':id/like')
  async increaseLike(@Param('id') id: string) {
    try {
      return this.commentaryService.increaseLike(+id);
    } catch (error) {
      throw error.message;
    }
  }
}
