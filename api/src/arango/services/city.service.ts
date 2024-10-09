import { Injectable } from '@nestjs/common';
import { InjectManager, ArangoManager } from 'nest-arango';
import { CityEntity } from '../entities/city.entity';

@Injectable()
export class CityService {
    constructor(
        @InjectManager()
        private readonly databaseManager: ArangoManager,
    ) {}

    async createCity(cityData: Partial<CityEntity>): Promise<CityEntity> {
        const db = this.databaseManager.database;

        if (!cityData.name) {
            throw new Error('City name is required');
        }

        const existingCity = await this.getCityByName(cityData.name, cityData.parent_id);
        if (existingCity) {
            return existingCity;
        }

        const result = await db.collection('Cities').save(cityData);
        return { ...cityData, _id: result._id, _key: result._key, _rev: result._rev } as CityEntity;
    }

    async getCityByName(name: string, parent_id: string): Promise<CityEntity | null> {
        const db = this.databaseManager.database;
        const cursor = await db.query(
            `FOR city IN Cities FILTER city.name == @name AND city.parent_id == @parentId RETURN city`,
            { name, parentId: parent_id }
        );
        return cursor.next();
    }

    async getAllCities(): Promise<CityEntity[]> {
        const db = this.databaseManager.database;
        const cursor = await db.query('FOR city IN Cities RETURN city');
        return cursor.all();
    }
}
