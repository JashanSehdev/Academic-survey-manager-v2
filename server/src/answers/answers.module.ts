import { Module } from '@nestjs/common';
import { AnswersService } from './answers.service.js';
import { AnswersController } from './answers.controller.js';

@Module({
  controllers: [AnswersController],
  providers: [AnswersService],
})
export class AnswersModule {}
