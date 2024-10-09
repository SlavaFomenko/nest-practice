import { Injectable } from '@nestjs/common';
import { InjectManager, ArangoManager } from 'nest-arango';
import {PlaceTypeEntity} from "../entities/place-type.entity";
import { Collections } from "../const/collections.constants";
import {BaseService} from "./base.service";

export class PlaceTypeService extends BaseService<PlaceTypeEntity> {
    constructor(
        @InjectManager()
        protected readonly databaseManager: ArangoManager,
    ) {
        super(databaseManager, Collections.PLACE_TYPES);
    }
}