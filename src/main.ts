import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://localhost:3000',
      'https://tof-nextjs-production.up.railway.app',
      'http://tof-nextjs-production.up.railway.app',
    ],
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
  });
  await app.listen(process.env.PORT);
}
bootstrap();
