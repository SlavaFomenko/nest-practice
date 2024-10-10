import {ArangoDocument, Collection} from 'nest-arango';
import {EdgeCollections} from '../../common/enums/arango.enums'

@Collection(EdgeCollections.COUNTRY_REGION.ADGE_NAME)
export class CountryRegionEdgeEntity extends ArangoDocument{
    _from: string; // ID of Country
    _to: string;   // ID of Region
}
