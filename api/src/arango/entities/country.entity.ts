import {ArangoDocument, Collection} from 'nest-arango';

@Collection('countries')
export class CountryEntity extends ArangoDocument{
    name: string;
    code: string;
}
