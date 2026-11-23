import { NotFoundException } from "@nestjs/common";
import { DeepPartial, ObjectLiteral, Repository } from "typeorm";
import { IBaseService } from "../interface/base-repository.interface.js";

export class BaseService <T extends ObjectLiteral> implements IBaseService<T>{
    constructor(
        protected readonly repository : Repository<T>
    ){}

    async create (data: DeepPartial<T>) : Promise<T> {
        const entity = this.repository.create(data)
        return this.repository.save(entity)
    }

    async findAll () : Promise <T[]> {
        return this.repository.find();
    }

    async findone (id : string) : Promise<T> {
        const entity = await this.repository.findOneBy({
            id,
        } as any)

        if (!entity) {
            throw new NotFoundException('Resource not found');
        }

        return entity
    }


    async update (
        id : string,
        data : DeepPartial<T>
    ) : Promise <T> {
        const entity = await this.findone(id);

        const updated = this.repository.merge(entity, data);

        return this.repository.save(updated);
    }

    async delete (id : string) : Promise<void> {
        const entity = await this.findone(id);

        await this.repository.remove(entity);
    }
}