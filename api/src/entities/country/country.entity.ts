import {ArangoDocument, Collection} from 'nest-arango';
import {Collections} from "../../common/enums/arango.enums";

@Collection(Collections.COUNTRIES)
export class CountryEntity extends ArangoDocument{
    name: string;
    code: string;
}
