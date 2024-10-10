import {ArangoDocument, Collection} from 'nest-arango';
import {EdgeCollections} from '../../common/enums/arango.enums'

@Collection(EdgeCollections.CITY_PLACE_TYPE.ADGE_NAME)
export class CityPlaceTypeEdgeEntity extends ArangoDocument{
    _from: string; // ID of Country
    _to: string;   // ID of Region
}
