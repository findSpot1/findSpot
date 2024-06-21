import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from '../users/models/user.model';
import { log } from 'console';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}
  async sendMail(user:User) {
    const url = `${String(process.env.API_HOST)}:${Number(process.env.PORT)}/api/client/activate/${user.activation_link}`;
    console.log(url);
    console.log(user);
    
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Welcome to yelp app! Confirm your email address',
      template: 'confirmation',
      context: {
        name: user.full_name,
        url,
      },
    });
  }
}
  

