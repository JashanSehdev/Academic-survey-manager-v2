import { Column, Entity, JoinColumn, OneToMany,OneToOne,type Relation } from "typeorm";
import { BaseEntity } from "../../common/entity/base.entity.js";
import { Response } from "../../responses/entities/response.entity.js";
import { SurveyQuestion } from "../../survey_questions/entities/survey_question.entity.js";
import { AnswerOption } from "../../response_options/entities/response_option.entity.js";


@Entity('answers')
export class Answer extends BaseEntity {

        @Column({type : 'uuid'})
        response_id : string

        @Column({type : 'uuid'})
        survey_question_id : string

        @Column({type : 'varchar', length : 1000})
        answer : string


        @OneToMany(() => Response, (res) => res.Answers)
        @JoinColumn({name : 'response_id'})
        Response : string

        @OneToMany(() => SurveyQuestion, (sq) => sq.Answers)
        @JoinColumn({name : 'survey_question_id'})
        SurveyQuestion : Relation<SurveyQuestion>

        @OneToOne(() => AnswerOption, (ao) => ao.Option)
        SelectedOption : Relation<AnswerOption>

    
}
