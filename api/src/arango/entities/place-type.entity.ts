import {ArangoDocument, Collection} from 'nest-arango';
import {Collections} from "../const/collections.constants";

@Collection(Collections.PLACE_TYPES)
export class PlaceTypeEntity extends ArangoDocument{
    name: string;
    code: string;
    parent_id: string; // foreign key to City
}