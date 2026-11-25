import { UserRole } from "../../users/enum/user-role.enum.js";

export interface AuthPayload {
    
    userId: string,
    username : string,
    email : string,
    card_id : string | number,
    role : UserRole
}