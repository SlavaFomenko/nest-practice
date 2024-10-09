import {ArangoDocument, Collection} from 'nest-arango';
import {Collections} from "../const/collections.constants";

@Collection(Collections.SENSORIDS)
export class SensorIdEntity extends ArangoDocument{
    name: string;
    status: string;
    parent_id: string;
}