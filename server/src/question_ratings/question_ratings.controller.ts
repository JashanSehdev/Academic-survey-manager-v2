import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QuestionRatingsService } from './question_ratings.service.js';
import { CreateQuestionRatingDto } from './dto/create-question_rating.dto.js';
import { UpdateQuestionRatingDto } from './dto/update-question_rating.dto.js';

@Controller('question-ratings')
export class QuestionRatingsController {
  constructor(private readonly questionRatingsService: QuestionRatingsService) {}

  @Post()
  create(@Body() createQuestionRatingDto: CreateQuestionRatingDto) {
    return this.questionRatingsService.create(createQuestionRatingDto);
  }

  @Get()
  findAll() {
    return this.questionRatingsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionRatingsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuestionRatingDto: UpdateQuestionRatingDto) {
    return this.questionRatingsService.update(+id, updateQuestionRatingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionRatingsService.remove(+id);
  }
}
