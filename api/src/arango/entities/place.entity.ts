import {ArangoDocument, Collection} from 'nest-arango';

@Collection('places')
export class PlaceEntity extends ArangoDocument{
    name: string;
    type: string; // residential, commercial
    parent_id: string; // foreign key to City
}