import { Injectable } from '@nestjs/common';
import { InjectManager, ArangoManager } from 'nest-arango';
import { RegionEntity } from '../entities/region.entity';

@Injectable()
export class RegionService {
    constructor(
        @InjectManager()
        private readonly databaseManager: ArangoManager,
    ) {}

    async createRegion(regionData: Partial<RegionEntity>): Promise<RegionEntity> {
        const db = this.databaseManager.database;

        if (!regionData.name) {
            throw new Error('Region name is required');
        }

        const existingRegion = await this.getRegionByName(regionData.name, regionData.parent_id);
        if (existingRegion) {
            return existingRegion;
        }

        const result = await db.collection('Regions').save(regionData);
        return { ...regionData, _id: result._id, _key: result._key, _rev: result._rev } as RegionEntity;
    }

    async getRegionByName(name: string, parent_id: string): Promise<RegionEntity | null> {
        const db = this.databaseManager.database;
        const cursor = await db.query(
            `FOR region IN Regions FILTER region.name == @name AND region.parent_id == @parentId RETURN region`,
            { name, parentId: parent_id }
        );
        return cursor.next();
    }

    async getAllRegions(): Promise<RegionEntity[]> {
        const db = this.databaseManager.database;
        const cursor = await db.query('FOR region IN Regions RETURN region');
        return cursor.all();
    }
}
