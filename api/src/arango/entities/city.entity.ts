import {ArangoDocument, Collection} from 'nest-arango';
import {Collections} from "../const/collections.constants";

@Collection(Collections.CITIES)
export class CityEntity extends ArangoDocument{
    name: string;
    code: string;
    parent_id: string; // foreign key to Region
}