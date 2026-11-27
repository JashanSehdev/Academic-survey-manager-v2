import { Type } from "class-transformer";
import { IsNumberString, IsOptional } from "class-validator";

export class PaginationDto {

    @IsOptional()
    @IsNumberString()
    @Type(() => Number)
    page  = 1

    @IsOptional()
    @IsNumberString()
    @Type(() => Number)
    limit = 10
}