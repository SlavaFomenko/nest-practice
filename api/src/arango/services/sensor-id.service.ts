import { Injectable } from '@nestjs/common';
import { InjectManager, ArangoManager } from 'nest-arango';
import {SensorIdEntity} from '../entities/sensor-id.entity';
import {Collections} from "../const/collections.constants";
import {BaseService} from "./base.service";

@Injectable()
export class SensorIdService extends BaseService<SensorIdEntity> {
    constructor(
        @InjectManager()
        protected readonly databaseManager: ArangoManager,
    ) {
        super(databaseManager, Collections.SENSORIDS);
    }
}