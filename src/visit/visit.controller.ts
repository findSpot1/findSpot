import { Controller, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { VisitService } from './visit.service';

@Controller('visit')
export class VisitController {
  constructor(private readonly visitService: VisitService) {}

  @Post()
  async logVisit(@Req() request: Request): Promise<{ message: string }> {
    const token = request.ip || 'unknown'; // Here, we're using the IP address as the token. You might want to replace this with a real token.
    await this.visitService.logVisit(token);
    return { message: 'Visit logged successfully' };
  }

  @Get('total')
  async getTotalVisits(): Promise<{ count: number }> {
    const count = await this.visitService.getTotalVisits();
    return { count };
  }

  @Get('last-month')
  async getLastMonthVisits(): Promise<{ count: number }> {
    const count = await this.visitService.getLastMonthVisits();
    return { count };
  }
}
