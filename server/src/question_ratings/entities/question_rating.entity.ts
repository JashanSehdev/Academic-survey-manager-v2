import { Check, Column, Entity, JoinColumn, ManyToOne,type  Relation } from "typeorm";
import { BaseEntity } from "../../common/entity/base.entity.js";
import { SurveyQuestion } from "../../survey_questions/entities/survey_question.entity.js";

@Entity('question_rating')
@Check('max > min')
export class QuestionRating extends BaseEntity{

    @Column({type : 'uuid'})    
    survey_question_id : string

    @Column({type : 'integer'})
    min : number

    @Column({type : 'integer'})
    max : number

    @ManyToOne(()=>SurveyQuestion, (qr) => qr.RatingOptions)
    @JoinColumn({name : 'survey_question_id'})
    SurveyQuestion : Relation<SurveyQuestion>
}   
