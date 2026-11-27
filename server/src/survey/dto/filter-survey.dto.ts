import { Column } from "typeorm";
import { PaginationDto } from "../../common/entity/dto/pagination.dto.js";
import { IsOptional, IsString } from "class-validator";

export class FilterDto extends PaginationDto {


    @IsOptional()
    @IsString()
    search : string


}