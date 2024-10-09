import {ArangoDocument, Collection} from 'nest-arango';

@Collection('sensors')
export class SensorEntity extends ArangoDocument{
    sensor_id: string;
    name: string;
    sensor_type: string;
    status: string;
    parent_id: string; // foreign key to Place
}