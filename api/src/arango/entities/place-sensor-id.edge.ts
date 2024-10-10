import {ArangoDocument, Collection} from 'nest-arango';
import {EdgeCollections} from '../../common/enums/arango.enums'

@Collection(EdgeCollections.PLACE_SENSOR_ID.ADGE_NAME)
export class PlaceSensorIDEdgeEntity extends ArangoDocument{
    _from: string; // ID of Place
    _to: string;   // ID of SensorId
}