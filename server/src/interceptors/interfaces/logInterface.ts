import { RequestMethod } from "@nestjs/common";

export interface ILog {
    method : string,
    endpoint  : string
}