import { Injectable } from '@nestjs/common';
import { CreateQuestionRatingDto } from './dto/create-question_rating.dto.js';
import { UpdateQuestionRatingDto } from './dto/update-question_rating.dto.js';

@Injectable()
export class QuestionRatingsService {
  create(createQuestionRatingDto: CreateQuestionRatingDto) {
    return 'This action adds a new questionRating';
  }

  findAll() {
    return `This action returns all questionRatings`;
  }

  findOne(id: number) {
    return `This action returns a #${id} questionRating`;
  }

  update(id: number, updateQuestionRatingDto: UpdateQuestionRatingDto) {
    return `This action updates a #${id} questionRating`;
  }

  remove(id: number) {
    return `This action removes a #${id} questionRating`;
  }
}
