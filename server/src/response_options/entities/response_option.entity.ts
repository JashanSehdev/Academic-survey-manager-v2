import { Column, Entity, JoinColumn, ManyToOne,OneToOne,type Relation } from "typeorm";
import { BaseEntity } from "../../common/entity/base.entity.js";
import { Response } from "../../responses/entities/response.entity.js";
import { QuestionOption } from "../../question_options/entities/question_option.entity.js";


@Entity('response_options')
export class ResponseOption extends BaseEntity {

    @Column({type : 'uuid'})
    response_id : string

    @Column({type : 'uuid'})
    question_option_id : string

    @OneToOne(() => Response, (res)=> res.Option)
    @JoinColumn({name : 'response_id'})
    Response : Relation<Response>

    @OneToOne(() => QuestionOption, (qo)=> qo.Responses)
    @JoinColumn({name : 'question_option_id'})
    Option : Relation<QuestionOption>

}
