import { PartialType } from '@nestjs/mapped-types';
import { CreateSurveyQuestionDto } from './create-survey_question.dto.js';

export class UpdateSurveyQuestionDto extends PartialType(CreateSurveyQuestionDto) {}
