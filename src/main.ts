import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useLogger(['log', 'warn', 'error', 'verbose', 'debug', 'fatal']);
  app.enableCors({
    allowedHeaders: ['content-type', 'X-Frame-Options'],
    credentials: true,
    origin: [
      'http://localhost:3000',
      'http://tof-nextjs-production.up.railway.app',
      'http://tof-dev.up.railway.app',
      'https://tof-nextjs-production.up.railway.app',
      'https://tof-dev.up.railway.app',
      'https://tof-nextjs.vercel.app',
    ],
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
  });
  app.use(cookieParser());
  app.use(
    session({
      secret: process.env.JWT_CONSTANT,
      resave: false,
      saveUninitialized: false,
      secure: true,
    }),
  );
  await app.listen(process.env.PORT);
}
bootstrap();
