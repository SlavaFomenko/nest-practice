import {ArangoDocument, Collection} from 'nest-arango';
import {EdgeCollections} from '../../const/collections.constants'

@Collection(EdgeCollections.REGION_CITY)
export class RegionCityEdgeEntity extends ArangoDocument{
    _from: string; // ID of Region
    _to: string;   // ID of City
}
