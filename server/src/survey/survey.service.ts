import { Injectable } from '@nestjs/common';
import { CreateSurveyDto } from './dto/create-survey.dto.js';
import { UpdateSurveyDto } from './dto/update-survey.dto.js';

@Injectable()
export class SurveyService {
  create(createSurveyDto: CreateSurveyDto) {
    return 'This action adds a new survey';
  }

  findAll() {
    return `This action returns all survey`;
  }

  findOne(id: number) {
    return `This action returns a #${id} survey`;
  }

  update(id: number, updateSurveyDto: UpdateSurveyDto) {
    return `This action updates a #${id} survey`;
  }

  remove(id: number) {
    return `This action removes a #${id} survey`;
  }
}
