import {Column, Entity, OneToMany,type Relation, Unique, VirtualColumn } from "typeorm";
import { BaseEntity } from "../../common/entity/base.entity.js";
import { SurveyQuestion } from "../../survey_questions/entities/survey_question.entity.js";
import { Question } from "../../questions/entities/question.entity.js";
import { Response } from "../../responses/entities/response.entity.js";
import { EProgram } from "../../users/enum/program.enum.js";

@Entity('surveys')
@Unique(['title', 'created_by'])
export class Survey extends BaseEntity {

    @Column({type : 'varchar'})
    title : string

    @Column({type : 'text', nullable : true})
    description : string

    @Column({type : 'uuid'})
    created_by : string

    @Column({type : 'enum', enum : EProgram})
    program  :  EProgram

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

    @VirtualColumn({
        query : (alias) => (
            `select count(*) from responses where survey_id = ${alias}.id`
        )
    })
    Responses_count : number

    @VirtualColumn({
        query : (alias) => (
            `selsct count * from survey_questions where survey_id = ${alias}.id`
        )
    })
    Questions_count : number

    
}
