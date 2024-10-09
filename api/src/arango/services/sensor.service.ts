import { Injectable } from '@nestjs/common';
import { InjectManager, ArangoManager } from 'nest-arango';
import { SensorEntity } from '../entities/sensor.entity';

@Injectable()
export class SensorService {
    constructor(
        @InjectManager()
        private readonly databaseManager: ArangoManager,
    ) {}

    async createSensor(sensorData: Partial<SensorEntity>): Promise<SensorEntity> {
        const db = this.databaseManager.database;

        if (!sensorData.name) {
            throw new Error('Sensor name is required');
        }

        const existingSensor = await this.getSensorByName(sensorData.name, sensorData.parent_id);
        if (existingSensor) {
            return existingSensor;
        }

        const result = await db.collection('Sensors').save(sensorData);
        return { ...sensorData, _id: result._id, _key: result._key, _rev: result._rev } as SensorEntity;
    }

    async getSensorByName(name: string, parent_id: string): Promise<SensorEntity | null> {
        const db = this.databaseManager.database;
        const cursor = await db.query(
            `FOR sensor IN Sensors FILTER sensor.name == @name AND sensor.parent_id == @parentId RETURN sensor`,
            { name, parentId: parent_id }
        );
        return cursor.next();
    }

    async getAllSensors(): Promise<SensorEntity[]> {
        const db = this.databaseManager.database;
        const cursor = await db.query('FOR sensor IN Sensors RETURN sensor');
        return cursor.all();
    }
}
