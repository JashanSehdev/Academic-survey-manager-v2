import { Column, Entity, OneToMany, type Relation } from "typeorm";
import { BaseEntity } from "../../common/entity/base.entity.js";
import { Response } from "../../responses/entities/response.entity.js";
import { UserRole } from "../enum/user-role.enum.js";
import { EProgram } from "../enum/program.enum.js";


@Entity('users')
export class User extends BaseEntity {

    @Column({type : 'varchar'})
    email : string

    @Column({type : 'integer'})
    card_id : number

    @Column({type : 'varchar'})
    hashed_password : string

    @Column({type : 'enum', enum : EProgram, nullable: true})
    program : EProgram

    @Column({type : 'varchar'})
    username : string

    @Column({type : 'enum', enum : UserRole})
    role : UserRole

    @OneToMany(() => Response ,(res) => res.Respondent)
    Responses : Relation<Response[]> 


}
