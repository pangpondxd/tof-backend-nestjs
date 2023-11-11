import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useLogger(['log', 'warn', 'error', 'verbose', 'debug', 'fatal']);
  app.enableCors({
    allowedHeaders: ['content-type', 'X-Frame-Options'],
    credentials: true,
    origin: [
      'http://localhost:3000',
      'https://localhost:3000',
      'https://tof-nextjs-production.up.railway.app',
      'http://tof-nextjs-production.up.railway.app',
    ],
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
  });
  app.use(cookieParser());
  await app.listen(process.env.PORT);
}
bootstrap();
