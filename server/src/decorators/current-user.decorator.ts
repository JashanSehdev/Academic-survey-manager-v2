import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { AuthPayload } from "../auth/interface/auth-payload.interface.js";

export const CurrentUser = createParamDecorator((data : keyof AuthPayload, ctx : ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.currentUser
    return data ? user[data] : user
})