import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
  );
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:8080',
      'http://tof-nextjs-production.up.railway.app',
      'https://tof-nextjs-production.up.railway.app',
    ],
    methods: ['POST', 'PUT', 'DELETE', 'GET'],
  });
  await app.listen(process.env.PORT);
}
bootstrap();
