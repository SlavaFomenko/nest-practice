import {ArangoDocument, Collection} from 'nest-arango';

@Collection('CountryRegionEdges')
export class CountryRegionEdgeEntity extends ArangoDocument{
    _from: string; // ID of Country
    _to: string;   // ID of Region
}
