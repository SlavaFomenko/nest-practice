import {ArangoDocument, Collection} from 'nest-arango';
import {EdgeCollections} from '../../common/enums/arango.enums'

@Collection(EdgeCollections.REGION_CITY.ADGE_NAME)
export class RegionCityEdgeEntity extends ArangoDocument{
    _from: string; // ID of Region
    _to: string;   // ID of City
}
