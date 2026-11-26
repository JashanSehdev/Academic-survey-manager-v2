import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne,type Relation } from "typeorm";
import { BaseEntity } from "../../common/entity/base.entity.js";
import { User } from "../../users/entities/user.entity.js";
import { Survey } from "../../survey/entities/survey.entity.js";
import { Answer } from "../../answers/entities/answer.entity.js";

@Entity('responses')
export class Response extends BaseEntity {

    @Column({type : 'uuid'})
    survey_id : string

    @Column({type : 'uuid'})
    user_id : string


    @ManyToOne(() => Survey, (sq) => sq.Responses)
    @JoinColumn({name : 'survey_id'})
    Survey : Relation<Survey>


    @ManyToOne(() => User, (user) => user.Responses)
    @JoinColumn({name : 'user_id'})
    Respondent : Relation<User>

    @OneToMany(() => Answer, (ans) => ans.Response)
    Answers : Relation<Answer[]>

    

}
