import { Check, Column, Entity } from "typeorm";
import { BaseEntity } from "../../common/entity/base.entity.js";

@Entity('question_options')
@Check('max > min')
export class QuestionRating extends BaseEntity{

    @Column({type : 'uuid'})    
    survey_question_id : string

    @Column({type : 'integer'})
    min : number

    @Column({type : 'integer'})
    max : number
}   
