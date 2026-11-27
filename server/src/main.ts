import 'dotenv'
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';
import { initializeTransactionalContext } from 'typeorm-transactional';
import cookieParser from 'cookie-parser'
import { ResponseInterceptor } from './interceptors/response.interceptors.js';

async function bootstrap() {
  initializeTransactionalContext();

  const app = await NestFactory.create(AppModule);
  
  app.enableCors({
    origin : process.env.CLIENT_URL ?? 'http://localhost:3000', //TODO: make the environment variables working
    credentials : true
  })
  app.useGlobalInterceptors(new ResponseInterceptor()); 
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());

  await app.listen(process.env.PORT ?? 3001);
}
await bootstrap();