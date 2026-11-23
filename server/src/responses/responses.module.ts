import { Module } from '@nestjs/common';
import { ResponsesService } from './responses.service.js';
import { ResponsesController } from './responses.controller.js';
import { Response } from './entities/response.entity.js';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports : [TypeOrmModule.forFeature([Response])],
  controllers: [ResponsesController],
  providers: [ResponsesService],
})
export class ResponsesModule {}
