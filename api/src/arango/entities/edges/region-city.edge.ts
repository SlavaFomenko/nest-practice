import {ArangoDocument, Collection} from 'nest-arango';

@Collection('RegionCityEdges')
export class RegionCityEdgeEntity extends ArangoDocument{
    _from: string; // ID of Region
    _to: string;   // ID of City
}
