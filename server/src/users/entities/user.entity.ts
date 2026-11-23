import { Column, Entity, OneToMany, type Relation } from "typeorm";
import { BaseEntity } from "../../common/entity/base.entity.js";
import { Response } from "../../responses/entities/response.entity.js";


@Entity('users')
export class User extends BaseEntity {

    @Column({type : 'varchar'})
    email : string

    @Column({type : 'integer'})
    card_id : number

    @Column({type : 'varchar'})
    hashed_password : string

    @OneToMany(() => Response ,(res) => res.Respondent)
    Responses : Relation<Response[]> 
}
