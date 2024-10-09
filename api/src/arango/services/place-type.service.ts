import { Injectable } from '@nestjs/common';
import { InjectManager, ArangoManager } from 'nest-arango';
import {PlaceTypeEntity} from "../entities/place-type.entity";
import { Collections } from "../const/collections.constants";

@Injectable()
export class PlaceTypeService {
    constructor(
        @InjectManager()
        private readonly databaseManager: ArangoManager,
    ) {}

    async createPlaceType(placeTypeData: PlaceTypeEntity): Promise<PlaceTypeEntity> {
        const db = this.databaseManager.database;

        if (!placeTypeData.name) {
            throw new Error('Place type name is required');
        }


        const existingPlaceType = await this.getPlaceTypeByName(placeTypeData.name, placeTypeData.parent_id);
        if (existingPlaceType) {
            return existingPlaceType;
        }

        const result = await db.collection(Collections.PLACE_TYPES).save(placeTypeData);
        return { ...placeTypeData, _id: result._id, _key: result._key, _rev: result._rev } as PlaceTypeEntity;
    }

    async getPlaceTypeByName(name: string, parent_id: string): Promise<PlaceTypeEntity | null> {
        const db = this.databaseManager.database;
        const cursor = await db.query(
            `FOR placeType IN ${Collections.PLACE_TYPES} FILTER placeType.name == @name AND placeType.parent_id == @parentId RETURN placeType`,
            { name, parentId: parent_id }
        );

        return cursor.next();
    }

    async getAllPlaceTypes(): Promise<PlaceTypeEntity[]> {
        const db = this.databaseManager.database;
        const cursor = await db.query(`FOR placeType IN ${Collections.PLACE_TYPES} RETURN placeType`);
        return cursor.all();
    }
}
