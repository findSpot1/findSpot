import { Injectable, Inject } from '@nestjs/common';
import { Op } from 'sequelize';
import { Visit } from './model/visit.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class VisitService {
  constructor(@InjectModel(Visit) private readonly vizitRepo: typeof Visit) {}

  async logVisit(token: string): Promise<void> {
    await this.vizitRepo.create({ token });
  }

  async getTotalVisits(): Promise<number> {
    const totalVisitsCount = await this.vizitRepo.count({
      distinct: true,
      col: 'token',
    });
    return totalVisitsCount;
  }

  async getLastMonthVisits(): Promise<number> {
    const today = new Date();
    const firstDayOfThisMonth = new Date(
      today.getFullYear(),
      today.getMonth(),
      1,
    );
    const firstDayOfLastMonth = new Date(
      today.getFullYear(),
      today.getMonth() - 1,
      1,
    );

    const lastMonthVisitsCount = await this.vizitRepo.count({
      distinct: true,
      col: 'token',
      where: {
        createdAt: {
          [Op.between]: [firstDayOfLastMonth, firstDayOfThisMonth],
        },
      },
    });

    return lastMonthVisitsCount;
  }
}
