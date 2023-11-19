import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksModule } from './tasks/tasks.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { RolesGuard } from './role/role.guard';
import { AuthGuard } from './auth/auth.guard';
import { QuestsModule } from './quests/quests.module';
import { Quest } from './quests/entities/quest.entity';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: process.env.MAILER_HOST,
        port: process.env.MAILER_PORT,
        secure: false,
        auth: {
          user: process.env.MAILER_EMAIL,
          pass: process.env.MAILER_PASSWORD,
        },
      },
    }),
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE,
      entities: [User, Quest],
      synchronize: true,
      autoLoadEntities: true,
    }),
    UsersModule,
    AuthModule,
    TasksModule,
    QuestsModule,
    SharedModule,
  ],
  controllers: [AppController],
  providers: [AppService, { useClass: RolesGuard, provide: AuthGuard }],
})
export class AppModule {}
