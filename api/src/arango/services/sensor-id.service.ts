import { Injectable } from '@nestjs/common';
import { InjectManager, ArangoManager } from 'nest-arango';
import {SensorIdEntity} from '../entities/sensor-id.entity';
import {Collections} from "../const/collections.constants";

@Injectable()
export class SensorIdService {
    constructor(
        @InjectManager()
        private readonly databaseManager: ArangoManager,
    ) {}

    async createSensorId(sensorIdData: SensorIdEntity): Promise<SensorIdEntity> {
        const db = this.databaseManager.database;

        if (!sensorIdData.name) {
            throw new Error('SensorId name is required');
        }

        const existingSensorId = await this.getSensorIdByName(sensorIdData.name, sensorIdData.parent_id);
        if (existingSensorId) {
            return existingSensorId;
        }

        const result = await db.collection(Collections.SENSORIDS).save(sensorIdData);
        return { ...sensorIdData, _id: result._id, _key: result._key, _rev: result._rev } as SensorIdEntity;
    }

    async getSensorIdByName(name: string, parent_id: string): Promise<SensorIdEntity | null> {
        const db = this.databaseManager.database;
        const cursor = await db.query(
            `FOR sensorId IN ${Collections.SENSORIDS} FILTER sensorId.name == @name AND sensorId.parent_id == @parentId RETURN sensorId`,
            { name, parentId: parent_id }
        );
        return cursor.next();
    }

    async getAllSensorIds(): Promise<SensorIdEntity[]> {
        const db = this.databaseManager.database;
        const cursor = await db.query(`FOR sensorId IN ${Collections.SENSORIDS} RETURN sensorId`);
        return cursor.all();
    }
}
