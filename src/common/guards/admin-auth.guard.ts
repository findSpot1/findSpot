import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAdminGuard implements CanActivate {
  constructor(private readonly jwtSevice: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    // console.log("req::", req);
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException({
        message: 'admin avtorizatsiyasidan otmagan  1 ',
      });
    }
    const bearer = authHeader.split(' ')[0];
    const token = authHeader.split(' ')[1];

    if (bearer != 'Bearer' || !token) {
      throw new UnauthorizedException({
        message: 'admin avtorizatsiyasidan otmagan 2 ',
      });
    }
    let admin: any;
    try {
      admin = this.jwtSevice.verify(token, {
        secret: process.env.ACCESS_TOKEN_KEY,
      });
    } catch (error) {
      throw new UnauthorizedException({
        message: 'admin avtorizatsiyasidan otmagan 3 ',
      });
    }
    req.admin = admin;
    console.log('admin req ', req);
    return true;
  }
}
