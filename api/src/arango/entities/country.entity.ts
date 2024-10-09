import {ArangoDocument, Collection} from 'nest-arango';
import {Collections} from "../const/collections.constants";

@Collection(Collections.COUNTRIES)
export class CountryEntity extends ArangoDocument{
    name: string;
    code: string;
}
