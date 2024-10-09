import {ArangoDocument, Collection} from 'nest-arango';
import {EdgeCollections} from '../../const/collections.constants'

@Collection(EdgeCollections.COUNTRY_REGION)
export class CountryRegionEdgeEntity extends ArangoDocument{
    _from: string; // ID of Country
    _to: string;   // ID of Region
}
