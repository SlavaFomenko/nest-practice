import {ArangoDocument, Collection} from 'nest-arango';
import {Collections} from "../const/collections.constants";

@Collection(Collections.PLACES)
export class PlaceEntity extends ArangoDocument{
    name: string;
    type: string; // residential, commercial
    parent_id: string; // foreign key to City
}