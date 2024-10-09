import {ArangoDocument, Collection} from 'nest-arango';
import {EdgeCollections} from '../../const/collections.constants'

@Collection(EdgeCollections.PLACE_TYPE_PLACE)
export class PlaceTypePlaceEdgeEntity extends ArangoDocument{
    _from: string; // ID of City
    _to: string;   // ID of Place
}
