import { PartialType } from '@nestjs/mapped-types';
import { CreateQuestionOptionDto } from './create-question_option.dto.js';

export class UpdateQuestionOptionDto extends PartialType(CreateQuestionOptionDto) {}
