import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, Unique, type Relation } from "typeorm";
import { EQuestionType } from "../enum/question-type.enum.js";
import { QuestionOption } from "../../question_options/entities/question_option.entity.js";
import { Survey } from "../../survey/entities/survey.entity.js";
import { Question } from "../../questions/entities/question.entity.js";
import { Response } from "../../responses/entities/response.entity.js";
import { BaseEntity } from "../../common/entity/base.entity.js";

@Entity('survey_questions')
@Unique(['survey_id', 'question_id'])
export class SurveyQuestion extends BaseEntity{
    
    @Column({type :'uuid'})
    survey_id : string

    @Column({type : 'uuid'})
    question_id : string

    @Column({type : 'enum', enum : EQuestionType})
    question_type : EQuestionType

    @Column({type : 'boolean', default : false})
    is_mandatory : boolean

    @OneToMany(() => QuestionOption, (qo) => qo.Question)
    Options : Relation<QuestionOption>

    @ManyToOne(() => Survey, (survey)=>survey.Questions)
    @JoinColumn({name: 'survey_id'})
    Survey : Relation<Survey>

    @ManyToOne(() => Question ,(ques) => ques.Surveys)
    @JoinColumn({name : 'question_id'})
    Question : Relation<Question>

    @OneToMany(() => Response, (res) => res.Question)
    Responses : Relation<Response[]>

}
