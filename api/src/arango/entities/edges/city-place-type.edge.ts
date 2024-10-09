import {ArangoDocument, Collection} from 'nest-arango';
import {EdgeCollections} from '../../const/collections.constants'

@Collection(EdgeCollections.CITY_PLACE_TYPE)
export class CityPlaceTypeEdgeEntity extends ArangoDocument{
    _from: string; // ID of Country
    _to: string;   // ID of Region
}
