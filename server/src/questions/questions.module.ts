import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service.js';
import { QuestionsController } from './questions.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './entities/question.entity.js';

@Module({
  imports : [TypeOrmModule.forFeature([Question])],
  controllers: [QuestionsController],
  providers: [QuestionsService],
})
export class QuestionsModule {}
