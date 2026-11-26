import {Column, Entity, OneToMany,type Relation, Unique } from "typeorm";
import { BaseEntity } from "../../common/entity/base.entity.js";
import { SurveyQuestion } from "../../survey_questions/entities/survey_question.entity.js";
import { Question } from "../../questions/entities/question.entity.js";
import { Response } from "../../responses/entities/response.entity.js";

@Entity('surveys')
@Unique(['title', 'created_by'])
export class Survey extends BaseEntity {

    @Column({type : 'varchar'})
    title : string

    @Column({type : 'text', nullable : true})
    description : string

    @Column({type : 'uuid'})
    created_by : string

    @Column({type : 'timestamp'})
    activation_date : Date

    @Column({type : 'timestamp'})
    expiration_date : Date

    @Column({type : 'boolean'})
    is_activated : boolean

    @OneToMany(() => SurveyQuestion, (sq) => sq.Survey)
    Questions : Relation<Question[]>

    @OneToMany(() => Response, (res) => res)
    Responses : Relation<Response[]>

    
}
