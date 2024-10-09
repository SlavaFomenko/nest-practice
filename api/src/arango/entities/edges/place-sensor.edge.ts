import {ArangoDocument, Collection} from 'nest-arango';

@Collection('PlaceSensorEdges')
export class PlaceSensorEdgeEntity extends ArangoDocument{
    _from: string; // ID of Place
    _to: string;   // ID of Sensor
}