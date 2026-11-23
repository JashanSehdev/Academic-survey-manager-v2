import { Module } from '@nestjs/common';
import { QuestionRatingsService } from './question_ratings.service.js';
import { QuestionRatingsController } from './question_ratings.controller.js';
import { QuestionOption } from '../question_options/entities/question_option.entity.js';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports : [ TypeOrmModule.forFeature([QuestionOption])],
  controllers: [QuestionRatingsController],
  providers: [QuestionRatingsService],
})
export class QuestionRatingsModule {}
