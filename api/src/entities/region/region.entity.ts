import {ArangoDocument, Collection} from 'nest-arango';
import {Collections} from "../../common/enums/arango.enums";


@Collection(Collections.REGIONS)
export class RegionEntity extends ArangoDocument{
    name: string;
    code: string;
    parent_id: string;
}