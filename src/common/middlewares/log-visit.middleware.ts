import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { VisitService } from '../../visit/visit.service';

@Injectable()
export class LogVisitMiddleware implements NestMiddleware {
  constructor(private readonly visitService: VisitService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.ip || 'unknown'; // Here, we're using the IP address as the token. You might want to replace this with a real token.
    await this.visitService.logVisit(token);
    next();
  }
}
