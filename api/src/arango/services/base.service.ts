import { Injectable } from '@nestjs/common';
import { InjectManager, ArangoManager } from 'nest-arango';

interface BasicFields{
    parent_id?: string;
    name: string;
}

@Injectable()
export abstract class BaseService<T extends BasicFields> {
    constructor(
        @InjectManager()
        protected readonly databaseManager: ArangoManager,
        protected readonly collectionName: string,
    ) {}

    async create(entityData: T ): Promise<T> {
        const db = this.databaseManager.database;

        const parentId = entityData.parent_id;

        const existingEntity = parentId
            ? await this.getByName(entityData.name, parentId)
            : await this.getByName(entityData.name);

        if (existingEntity) {
            return existingEntity;
        }

        const result = await db.collection(this.collectionName).save(entityData);
        return { ...entityData, _id: result._id, _key: result._key, _rev: result._rev } as T;
    }



    async getByName(name: string, parentId?: string): Promise<T | null> {
        const db = this.databaseManager.database;
        const bindParams = { name };
        let query = `FOR entity IN ${this.collectionName} FILTER entity.name == @name`;

        if (parentId) {
            query += ` AND entity.parent_id == @parentId`;
            bindParams['parentId'] = parentId;
        }
        // console.log(bindParams)

        query += ` RETURN entity`;

        const cursor = await db.query(query, bindParams);
        console.log('hello')
        return cursor.next();
    }

    async getAll(): Promise<T[]> {
        const db = this.databaseManager.database;
        const cursor = await db.query(`FOR entity IN ${this.collectionName} RETURN entity`);
        return cursor.all();
    }
}
