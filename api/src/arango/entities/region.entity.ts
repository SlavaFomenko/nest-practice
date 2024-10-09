import {ArangoDocument, Collection} from 'nest-arango';
import {Collections} from "../const/collections.constants";


@Collection(Collections.REGIONS)
export class RegionEntity extends ArangoDocument{
    name: string;
    code: string;
    parent_id: string;
}