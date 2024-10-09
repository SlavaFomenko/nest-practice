import { Injectable } from '@nestjs/common';
import { InjectManager, ArangoManager } from 'nest-arango';
import { PlaceEntity } from '../entities/place.entity';
import { Collections } from "../const/collections.constants";

@Injectable()
export class PlaceService {
    constructor(
        @InjectManager()
        private readonly databaseManager: ArangoManager,
    ) {}

    async createPlace(placeData: PlaceEntity): Promise<PlaceEntity> {
        const db = this.databaseManager.database;

        if (!placeData.name) {
            throw new Error('Place name is required');
        }

        const existingPlace = await this.getPlaceByName(placeData.name, placeData.parent_id);
        if (existingPlace) {
            return existingPlace;
        }

        const result = await db.collection(Collections.PLACES).save(placeData);
        return { ...placeData, _id: result._id, _key: result._key, _rev: result._rev } as PlaceEntity;
    }

    async getPlaceByName(name: string, parent_id: string): Promise<PlaceEntity | null> {
        const db = this.databaseManager.database;
        const cursor = await db.query(
            `FOR place IN ${Collections.PLACES} FILTER place.name == @name AND place.parent_id == @parentId RETURN place`,
            { name, parentId: parent_id }
        );
        return cursor.next();
    }

    async getAllPlaces(): Promise<PlaceEntity[]> {
        const db = this.databaseManager.database;
        const cursor = await db.query(`FOR place IN ${Collections.PLACES} RETURN place`);
        return cursor.all();
    }
}
