import {Injectable} from "@nestjs/common";
import {BaseService} from "../base.service";
import {PlaceEntity} from "./place.entity";
import {ArangoManager, InjectManager} from "nest-arango";
import {Collections} from "../../common/enums/arango.enums";

@Injectable()
export class PlaceService extends BaseService<PlaceEntity> {
    constructor(
        @InjectManager()
        protected readonly databaseManager: ArangoManager,
    ) {
        super(databaseManager, Collections.PLACES);
    }
}