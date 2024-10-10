import {ArangoDocument, Collection} from 'nest-arango';
import {EdgeCollections} from '../../common/enums/arango.enums'

@Collection(EdgeCollections.PLACE_TYPE_PLACE.ADGE_NAME)
export class PlaceTypePlaceEdgeEntity extends ArangoDocument{
    _from: string;
    _to: string;
}
