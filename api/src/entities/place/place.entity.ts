import {ArangoDocument, Collection} from 'nest-arango';
import {Collections} from "../../common/enums/arango.enums";

@Collection(Collections.PLACES)
export class PlaceEntity extends ArangoDocument{
    name: string;
    code: string;
    parent_id: string; // foreign key to City
}