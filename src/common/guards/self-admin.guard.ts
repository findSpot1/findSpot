import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { log } from 'console';
import { Observable } from 'rxjs';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();

    // console.log('req.admin ', req.admin);
    // console.log('req.params.id  ', req.params.raw.id);
    // console.log('req.admin.sub -> ', req.admin.sub);
    

    // if (String(req.admin.sub) != req.params.id) {
    //   throw new ForbiddenException({
    //     message: 'Ruxsat etilmagan foydalanuvchi',
    //   });
    // }
    if (req.admin.is_active === true && req.admin.is_creator == true) {
      throw new ForbiddenException({
        message:
          'Ruxsat etilmagan admin oxirgi req.admin.isctivate ishladi ga tuwdi`',
      });
    }
    return true;
  }
}
