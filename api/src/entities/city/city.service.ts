import { Injectable } from '@nestjs/common';
import { InjectManager, ArangoManager } from 'nest-arango';
import { CityEntity } from './city.entity';
import { Collections } from "../../common/enums/arango.enums";
import { BaseService } from '../base.service';

@Injectable()
export class CityService extends BaseService<CityEntity> {
    constructor(
        @InjectManager()
        protected readonly databaseManager: ArangoManager,
    ) {
        super(databaseManager, Collections.CITIES);
    }
}