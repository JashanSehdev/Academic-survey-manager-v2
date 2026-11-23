import { Module } from '@nestjs/common';
import { SurveyQuestionsService } from './survey_questions.service.js';
import { SurveyQuestionsController } from './survey_questions.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SurveyQuestion } from './entities/survey_question.entity.js';


@Module({
  imports: [TypeOrmModule.forFeature([SurveyQuestion])],
  controllers: [SurveyQuestionsController],
  providers: [SurveyQuestionsService],
})
export class SurveyQuestionsModule {

}
