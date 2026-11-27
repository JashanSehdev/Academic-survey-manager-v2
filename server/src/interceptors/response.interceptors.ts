import { CallHandler, ExecutionContext, HttpException, InternalServerErrorException, NestInterceptor } from "@nestjs/common";
import { catchError, map, Observable, throwError, timestamp } from "rxjs";

export class ResponseInterceptor implements NestInterceptor {

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        
        const response = context.switchToHttp().getResponse()
        const statusCode = response.statusCode;
        const httpMethod : unknown = context.switchToHttp().getRequest().method;

        let message : unknown = ""

        return next.handle().pipe(
            map((data) => {
                switch (httpMethod) {
                    case 'GET' :
                        message : 'Data get successfully';
                        break;
                    
                    case 'POST' :
                        message : 'Data created successfully';
                        break;
                    
                    case 'PATCH':
                        message : 'Data has been updated successfullt';
                        break;
                    
                    case 'PUT' :
                        message : 'Data has been updated successfullt';
                        break;

                    case 'DELETE' :
                        message :  'Data has been Deleted successfully'
                        break;

                    default :
                        message : 'Success'
                        break;
                }

                return {
                    statusCode,
                    message,
                    data,
                    

                }
            }),
             catchError((err) => {
                const statusCode = err instanceof HttpException ? err.getStatus() : 500;
                const errorResponse = {
                    statusCode,
                    message: err.message || new InternalServerErrorException(),
                    error : err.name || 'Error',
                    timestamp : Date.now(),
                    data : {}
                }

                return throwError(() => new HttpException(errorResponse, statusCode))
                
            })
           
         )


    }
}