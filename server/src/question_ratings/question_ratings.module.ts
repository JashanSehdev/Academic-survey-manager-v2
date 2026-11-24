import { Module } from '@nestjs/common';
import { QuestionRatingsService } from './question_ratings.service.js';
import { QuestionRatingsController } from './question_ratings.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionRating } from './entities/question_rating.entity.js';

@Module({
  imports : [ TypeOrmModule.forFeature([QuestionRating])],
  controllers: [QuestionRatingsController],
  providers: [QuestionRatingsService],
})
export class QuestionRatingsModule {}
