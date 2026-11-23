import { IsEnum, IsString } from "class-validator";
import { EQuestionType } from "../../survey_questions/enum/question-type.enum.js";

export class CreateQuestionDto {

    @IsString()
    title : string

}
