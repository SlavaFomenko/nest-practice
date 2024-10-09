import {ArangoDocument, Collection} from 'nest-arango';

@Collection('cities')
export class CityEntity extends ArangoDocument{
    name: string;
    code: string;
    parent_id: string; // foreign key to Region
}