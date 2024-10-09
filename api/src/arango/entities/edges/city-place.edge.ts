import {ArangoDocument, Collection} from 'nest-arango';

@Collection('CityPlaceEdges')
export class CityPlaceEdgeEntity extends ArangoDocument{
    _from: string; // ID of City
    _to: string;   // ID of Place
}
