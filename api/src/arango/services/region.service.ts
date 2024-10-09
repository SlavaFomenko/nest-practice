import { Injectable } from '@nestjs/common';
import { InjectManager, ArangoManager } from 'nest-arango';
import { RegionEntity } from '../entities/region.entity';
import {Collections} from "../const/collections.constants";
import {BaseService} from "./base.service";

@Injectable()
export class RegionService extends BaseService<RegionEntity> {
    constructor(
        @InjectManager()
        protected readonly databaseManager: ArangoManager,
    ) {
        super(databaseManager, Collections.REGIONS);
    }
}