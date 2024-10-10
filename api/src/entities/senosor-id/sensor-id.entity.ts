import {ArangoDocument, Collection} from 'nest-arango';
import {Collections} from "../../common/enums/arango.enums";

@Collection(Collections.SENSOR_IDS)
export class SensorIdEntity extends ArangoDocument{
    code:string;
    name: string | null;
    parent_id: string;
}