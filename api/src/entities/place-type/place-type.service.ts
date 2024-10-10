import { InjectManager, ArangoManager } from 'nest-arango';
import {PlaceTypeEntity} from "./place-type.entity";
import { Collections } from "../../common/enums/arango.enums";
import {BaseService} from "../base.service";

export class PlaceTypeService extends BaseService<PlaceTypeEntity> {
    constructor(
        @InjectManager()
        protected readonly databaseManager: ArangoManager,
    ) {
        super(databaseManager, Collections.PLACE_TYPES);
    }
}