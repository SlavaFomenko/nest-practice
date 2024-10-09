import {ArangoDocument, Collection} from 'nest-arango';

@Collection('regions')
export class RegionEntity extends ArangoDocument{
    name: string;
    code: string;
    parent_id: string;
}