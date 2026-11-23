import { Column, Entity, JoinColumn, ManyToOne, OneToOne,type Relation } from "typeorm";
import { BaseEntity } from "../../common/entity/base.entity.js";
import { ResponseOption } from "../../response_options/entities/response_option.entity.js";
import { SurveyQuestion } from "../../survey_questions/entities/survey_question.entity.js";
import { User } from "../../users/entities/user.entity.js";

@Entity('responses')
export class Response extends BaseEntity {

    @Column({type : 'uuid'})
    survey_question_id : string

    @Column({type : 'uuid'})
    user_id : string

    @Column({type : 'text'})
    answer : string

    @OneToOne(() => ResponseOption, (ro)=> ro.Response)
    Option : Relation<ResponseOption>

    @ManyToOne(() => SurveyQuestion, (sq) => sq.Responses)
    @JoinColumn({name : 'survey_question_id'})
    Question : Relation<SurveyQuestion>

    @ManyToOne(() => User, (user) => user.Responses)
    @JoinColumn({name : 'user_id'})
    Respondent : Relation<User>

}
