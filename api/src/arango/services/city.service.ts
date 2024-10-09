import { Injectable } from '@nestjs/common';
import { InjectManager, ArangoManager } from 'nest-arango';
import { CityEntity } from '../entities/city.entity';
import { Collections } from "../const/collections.constants";
import { BaseService } from './base.service';

@Injectable()
export class CityService extends BaseService<CityEntity> {
    constructor(
        @InjectManager()
        protected readonly databaseManager: ArangoManager,
    ) {
        super(databaseManager, Collections.CITIES);
    }
}