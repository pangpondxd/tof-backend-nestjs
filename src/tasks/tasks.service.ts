import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { MailerService } from '@nestjs-modules/mailer';
@Injectable()
export class TasksService {
  constructor(private readonly mailerService: MailerService) {}
  private readonly logger = new Logger(TasksService.name);

  // * * * * * *
  // | | | | | |
  // | | | | | day of week
  // | | | | months
  // | | | day of month
  // | | hours
  // | minutes
  // seconds (optional)

  //   @Cron('10 * * * * *')
  //   handleCron() {
  //     this.mailerService.sendMail({
  //       to: '77anny@gmail.com',
  //       from: 'webmaster.tanawat@gmail.com',
  //       subject: 'Hello Dukdui',
  //       text: 'ส่งเมลทุก ๆ วินาที ที่ 10',
  //     });
  //     this.logger.debug('Called when the current second is 10');
  //   }
}
