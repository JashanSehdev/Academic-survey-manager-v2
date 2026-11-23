import { Module } from '@nestjs/common';
import { QuestionOptionsService } from './question_options.service.js';
import { QuestionOptionsController } from './question_options.controller.js';

@Module({
  controllers: [QuestionOptionsController],
  providers: [QuestionOptionsService],
})
export class QuestionOptionsModule {}
