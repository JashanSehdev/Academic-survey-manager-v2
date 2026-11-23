import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SurveyQuestionsService } from './survey_questions.service.js';
import { CreateSurveyQuestionDto } from './dto/create-survey_question.dto.js';
import { UpdateSurveyQuestionDto } from './dto/update-survey_question.dto.js';

@Controller('surveys')
export class SurveyQuestionsController {
  constructor(private readonly surveyQuestionsService: SurveyQuestionsService) {}

  @Post()
  create(@Body() createSurveyQuestionDto: CreateSurveyQuestionDto) {
    return this.surveyQuestionsService.createSurvey(createSurveyQuestionDto);
  }

  @Get()
  findAll() {
    return this.surveyQuestionsService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.surveyQuestionsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateSurveyQuestionDto: UpdateSurveyQuestionDto) {
  //   return this.surveyQuestionsService.update(id, updateSurveyQuestionDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.surveyQuestionsService.delete(id);
  }
}
