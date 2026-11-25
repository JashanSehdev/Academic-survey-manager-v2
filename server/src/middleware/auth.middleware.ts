import { Cookies, Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import type { NextFunction, Request, Response } from "express";
import { access } from "fs";
import { AuthPayload } from "../auth/interface/auth-payload.interface.js";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(
        private readonly jwtService : JwtService
    ){}
    async use(req: Request & {currentUser : AuthPayload}, res: Response, next: NextFunction) {
        const token = this.extractTokenFromCookie(req);

        if (!token) {
            throw new UnauthorizedException('token not found')
        }
        try {
      const payload = await this.jwtService.verifyAsync(token);
      req['currentUser'] = payload;
      next();
    } catch (error) {
      return next(new UnauthorizedException('Invalid or expired token'));
    }
    }

    private extractTokenFromCookie(request: Request): string | undefined {
    return request.cookies?.access_token;
  }

}