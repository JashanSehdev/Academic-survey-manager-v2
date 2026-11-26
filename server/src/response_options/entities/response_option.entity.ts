import { Column, Entity, JoinColumn, ManyToOne,OneToOne,type Relation } from "typeorm";
import { BaseEntity } from "../../common/entity/base.entity.js";
import { Response } from "../../responses/entities/response.entity.js";
import { QuestionOption } from "../../question_options/entities/question_option.entity.js";
import { Answer } from "../../answers/entities/answer.entity.js";


@Entity('answer_options')
export class AnswerOption extends BaseEntity {

    @Column({type : 'uuid'})
    answer_id : string

    @Column({type : 'uuid'})
    question_option_id : string

    @OneToOne(() => Answer, (ans)=> ans.SelectedOption)
    @JoinColumn({name : 'answer_id'})
    Answer : Relation<Answer>

    @OneToOne(() => QuestionOption, (qo)=> qo.AnswerSelected)
    @JoinColumn({name : 'question_option_id'})
    Option : Relation<QuestionOption>

}
