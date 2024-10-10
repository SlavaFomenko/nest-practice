import {ArangoDocument, Collection} from 'nest-arango';
import {Collections} from "../../common/enums/arango.enums";

@Collection(Collections.SENSOR_IDS)
export class SensorEntity extends ArangoDocument{
    code:string;
    name: string | null;
    sensor_id:string;
    parent_id: string;
}