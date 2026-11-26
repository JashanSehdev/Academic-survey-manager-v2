import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, Unique, type Relation } from "typeorm";
import { BaseEntity } from "../../common/entity/base.entity.js";
import { SurveyQuestion } from "../../survey_questions/entities/survey_question.entity.js";
import { AnswerOption } from "../../response_options/entities/response_option.entity.js";

@Entity('question_options')
@Unique(['survey_question_id', 'title'])
export class QuestionOption extends BaseEntity {

    @Column({type : 'uuid'})
    survey_question_id : string

    @Column({type : "varchar"})
    title : string

    @ManyToOne(()=> SurveyQuestion, (sq) => sq.Options)
    @JoinColumn({name : 'survey_question_id'})
    Question: Relation<SurveyQuestion>


    @OneToOne(() => AnswerOption, (ro) => ro.Option)
    AnswerSelected : Relation<AnswerOption>

}
