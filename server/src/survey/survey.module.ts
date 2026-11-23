import { Module } from '@nestjs/common';
import { SurveyService } from './survey.service.js';
import { SurveyController } from './survey.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Survey } from './entities/survey.entity.js';

@Module({
  imports : [TypeOrmModule.forFeature([Survey])],
  controllers: [SurveyController],
  providers: [SurveyService],
})
export class SurveyModule {}
