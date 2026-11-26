import { Injectable } from '@nestjs/common';
import { CreateAnswerDto } from './dto/create-answer.dto.js';
import { UpdateAnswerDto } from './dto/update-answer.dto.js';

@Injectable()
export class AnswersService {
  create(createAnswerDto: CreateAnswerDto) {
    return 'This action adds a new answer';
  }

  findAll() {
    return `This action returns all answers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} answer`;
  }

  update(id: number, updateAnswerDto: UpdateAnswerDto) {
    return `This action updates a #${id} answer`;
  }

  remove(id: number) {
    return `This action removes a #${id} answer`;
  }
}
