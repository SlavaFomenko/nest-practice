import {ArangoDocument, Collection} from 'nest-arango';
import {EdgeCollections} from '../../const/collections.constants'

@Collection(EdgeCollections.PLACE_SENSORID)
export class PlaceSensorIDEdgeEntity extends ArangoDocument{
    _from: string; // ID of Place
    _to: string;   // ID of SensorId
}