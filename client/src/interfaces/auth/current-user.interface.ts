import { UserRole } from "@/enum/user-role.enum";

export interface ICurrentUser {
    userId : string,
    username : string,
    email : string,
    role : UserRole
}