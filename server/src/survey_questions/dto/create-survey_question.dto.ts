import { ArrayMinSize, IsArray, IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { EQuestionType } from "../enum/question-type.enum.js";
import { Type } from "class-transformer";

export class CreateSurveyQuestionDto {

    @IsString()
    title : string

    @IsOptional()
    @IsString()
    description : string

    @IsString()
    activation_date : string

    @IsString()
    expiration_date : string

    @IsOptional()
    @IsBoolean()
    is_activated : boolean

    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({each: true})
    @Type(() =>  QuestionDto)
    questions : QuestionDto[]

}

class RatingDto{
    @IsNumber()
    min : number

    @IsNumber()
    max : number
}


class QuestionDto{
    
    @IsString()
    title : string

    @IsEnum(EQuestionType)
    question_type : EQuestionType

    @IsBoolean()
    @IsNotEmpty()
    is_mandatory : boolean

    @IsOptional()
    @Type(() => RatingDto)
    rating_options : RatingDto

    @IsOptional()
    @IsArray()
    @ArrayMinSize(1)
    @IsString({each : true})
    mcq_options : string[]

}

