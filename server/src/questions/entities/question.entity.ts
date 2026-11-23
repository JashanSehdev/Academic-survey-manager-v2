import { Column, Entity, OneToMany, type Relation } from "typeorm";
import { BaseEntity } from "../../common/entity/base.entity.js";
import { SurveyQuestion } from "../../survey_questions/entities/survey_question.entity.js";



@Entity('questions')
export class Question extends BaseEntity {

    @Column({type : 'varchar', unique : true})
    title : string

    @OneToMany(()=>SurveyQuestion, (sq) => sq.Question)
    Surveys : Relation<SurveyQuestion[]>

}

