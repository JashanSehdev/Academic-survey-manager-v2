import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { LoggerInterceptors } from './interceptors/loggerInterceptors.js';
import { ValidationPipe } from '@nestjs/common';
import { initializeTransactionalContext } from 'typeorm-transactional';

async function bootstrap() {
  initializeTransactionalContext();

  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(new LoggerInterceptors());
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT ?? 3001);
}
await bootstrap();
