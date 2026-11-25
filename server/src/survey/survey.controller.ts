import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SurveyService } from './survey.service.js';
import { CreateSurveyDto } from './dto/create-survey.dto.js';
import { UpdateSurveyDto } from './dto/update-survey.dto.js';
import { CurrentUser } from '../decorators/current-user.decorator.js';

@Controller('surveys')
export class SurveyController {
  constructor(private readonly surveyService: SurveyService) {}

  @Post()
  create(@Body() createSurveyDto: CreateSurveyDto, @CurrentUser('userId') userId : string) {
    return this.surveyService.createSurvey(createSurveyDto, userId);
  }

  @Get()
  findAll() {
    return this.surveyService.findAll();
  }
}
