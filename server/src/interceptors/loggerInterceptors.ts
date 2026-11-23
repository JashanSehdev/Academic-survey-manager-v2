import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { ILog } from "./interfaces/logInterface.js";
import { Observable, tap } from "rxjs";
import { Request } from "express";

export class LoggerInterceptors implements NestInterceptor {

    intercept(context: ExecutionContext, next: CallHandler<unknown>): Observable<any>{
        
        const request : Request = context.getArgByIndex(0);
        
        const log :ILog = {
            method : request.method,
            endpoint : request.path
        }
        console.log(log)

        const now = Date.now()
        return next
        .handle()
        .pipe(
            tap(() => console.log(`After... ${Date.now() - now}`))
        )
    }
    
}