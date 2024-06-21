import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentaryDto } from './dto/create-commentary.dto';
import { UpdateCommentaryDto } from './dto/update-commentary.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Commentary } from './models/commentary.model';
import { BusinessService } from '../business/business.service';

@Injectable()
export class CommentaryService {
  constructor(
    @InjectModel(Commentary) private readonly commentRepo: typeof Commentary,
    private readonly businessService: BusinessService,
  ) {}

  async create(createCommentaryDto: CreateCommentaryDto) {
    try {
      const comment = await this.commentRepo.create(createCommentaryDto);
      const business = await this.businessService.findOne(
        createCommentaryDto.business_id,
      );
      business.reviews += 1;
      await business.save();
      return comment;
    } catch (error) {
      throw error.message;
    }
  }

  async findAll() {
    try {
      return await this.commentRepo.findAll({ include: { all: true } });
    } catch (error) {
      throw error.message;
    }
  }

  async findOne(id: number) {
    try {
      return await this.commentRepo.findByPk(id, { include: { all: true } });
    } catch (error) {
      throw error.message;
    }
  }

  async update(id: number, updateCommentaryDto: UpdateCommentaryDto) {
    try {
      const check = await this.findOne(id);
      if (!check) {
        throw new NotFoundException('Comment not found');
      }
      return await this.commentRepo.update(updateCommentaryDto, {
        where: { id: id },
        returning: true,
      });
    } catch (error) {
      throw error.message;
    }
  }

  async remove(id: number) {
    try {
      const check = await this.findOne(id);
      if (!check) {
        throw new NotFoundException('Comment not found');
      }
      return await this.commentRepo.destroy({
        where: { id: id },
      });
    } catch (error) {
      throw error.message;
    }
  }
  async increaseLike(id) {
    try {
      const comment = await this.commentRepo.findByPk(id);
      comment.commentary_likes += 1;
      await comment.save();
      return comment;
    } catch (error) {
      throw error.message;
    }
  }
}
