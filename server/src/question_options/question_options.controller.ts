import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QuestionOptionsService } from './question_options.service.js';
import { CreateQuestionOptionDto } from './dto/create-question_option.dto.js';
import { UpdateQuestionOptionDto } from './dto/update-question_option.dto.js';

@Controller('question-options')
export class QuestionOptionsController {
  constructor(private readonly questionOptionsService: QuestionOptionsService) {}

  @Post()
  create(@Body() createQuestionOptionDto: CreateQuestionOptionDto) {
    return this.questionOptionsService.create(createQuestionOptionDto);
  }

  @Get()
  findAll() {
    return this.questionOptionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionOptionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuestionOptionDto: UpdateQuestionOptionDto) {
    return this.questionOptionsService.update(+id, updateQuestionOptionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionOptionsService.remove(+id);
  }
}
