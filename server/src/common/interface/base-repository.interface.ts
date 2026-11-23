import { DeepPartial } from "typeorm";

export interface  IBaseService <T> {
    create(createDto : any) : Promise<T>;
    update(id: string, updateDto :DeepPartial<T>) : Promise<T>;
    delete(id : string) : Promise<void>;
    findone(id : string) : Promise<T>;
    findAll() :  Promise<T[]>;    
}