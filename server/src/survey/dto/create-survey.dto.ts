import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { EQuestionType } from '../../survey_questions/enum/question-type.enum.js';

export class CreateSurveyDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsString()
  activation_date: string;

  @IsString()
  expiration_date: string;

  @IsOptional()
  @IsBoolean()
  is_activated: boolean;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => QuestionDto)
  questions: QuestionDto[];
}

class RatingDto {
  @IsNumber()
  min: number;

  @IsNumber()
  max: number;
}

class QuestionDto {
  @IsString()
  title: string;

  @IsEnum(EQuestionType)
  question_type: EQuestionType;

  @IsBoolean()
  @IsNotEmpty()
  is_mandatory: boolean;

  @IsOptional()
  @Type(() => RatingDto)
  rating_options: RatingDto;

  @ValidateIf((o) => o.question_type === EQuestionType.MCQ)
  @Transform(({ value }) =>
    Array.isArray(value)
      ? value.filter((option) => option !== null).map((option) => option.value)
      : value,
  )
  @IsArray()
  @ArrayMinSize(2)
  @IsString({ each: true })
  mcq_options?: string[];
}

class McqOptionsDto {
  @IsString()
  value: string;
}
