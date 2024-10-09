import { Injectable } from '@nestjs/common';
import { InjectManager, ArangoManager } from 'nest-arango';
import { CityEntity } from '../entities/city.entity';
import {Collections} from "../const/collections.constants";

@Injectable()
export class CityService {
    constructor(
        @InjectManager()
        private readonly databaseManager: ArangoManager,
    ) {}

    async createCity(cityData: CityEntity): Promise<CityEntity> {
        const db = this.databaseManager.database;

        if (!cityData.name) {
            throw new Error('City name is required');
        }

        console.log(cityData)

        const existingCity = await this.getCityByName(cityData.name, cityData.parent_id);
        if (existingCity) {
            return existingCity;
        }

        const result = await db.collection(Collections.CITIES).save(cityData);
        return { ...cityData, _id: result._id, _key: result._key, _rev: result._rev } as CityEntity;
    }

    async getCityByName(name: string, parent_id: string): Promise<CityEntity | null> {
        const db = this.databaseManager.database;
        const cursor = await db.query(
            `FOR city IN ${Collections.CITIES} FILTER city.name == @name AND city.parent_id == @parentId RETURN city`,
            { name, parentId: parent_id }
        );
        return cursor.next();
    }

    async getAllCities(): Promise<CityEntity[]> {
        const db = this.databaseManager.database;
        const cursor = await db.query(`FOR city IN ${Collections.CITIES} RETURN city`);
        return cursor.all();
    }
}
