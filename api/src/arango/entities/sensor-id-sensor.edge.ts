import {ArangoDocument, Collection} from 'nest-arango';
import {EdgeCollections} from '../../common/enums/arango.enums'

@Collection(EdgeCollections.SENSOR_ID_SENSOR.ADGE_NAME)
export class SensorIdSensorEdgeEntity extends ArangoDocument{
    _from: string; // ID of Region
    _to: string;   // ID of City
}
