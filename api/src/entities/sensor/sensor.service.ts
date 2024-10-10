import { Injectable } from '@nestjs/common';
import { InjectManager, ArangoManager } from 'nest-arango';
import {Collections} from "../../common/enums/arango.enums";
import {BaseService} from "../base.service";
import {SensorEntity} from "./sensor.entity";

@Injectable()
export class SensorService extends BaseService<SensorEntity> {
    constructor(
        @InjectManager()
        protected readonly databaseManager: ArangoManager,
    ) {
        super(databaseManager, Collections.SENSORS);
    }
}