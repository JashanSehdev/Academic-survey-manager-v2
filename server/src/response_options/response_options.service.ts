import { Injectable } from '@nestjs/common';
import { CreateResponseOptionDto } from './dto/create-response_option.dto.js';
import { UpdateResponseOptionDto } from './dto/update-response_option.dto.js';

@Injectable()
export class ResponseOptionsService {
  create(createResponseOptionDto: CreateResponseOptionDto) {
    return 'This action adds a new responseOption';
  }

  findAll() {
    return `This action returns all responseOptions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} responseOption`;
  }

  update(id: number, updateResponseOptionDto: UpdateResponseOptionDto) {
    return `This action updates a #${id} responseOption`;
  }

  remove(id: number) {
    return `This action removes a #${id} responseOption`;
  }
}
