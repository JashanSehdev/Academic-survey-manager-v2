import { PartialType } from '@nestjs/mapped-types';
import { CreateQuestionRatingDto } from './create-question_rating.dto.js';

export class UpdateQuestionRatingDto extends PartialType(CreateQuestionRatingDto) {}
