import { Injectable } from '@nestjs/common';
import { InjectManager, ArangoManager } from 'nest-arango';
import { CountryService } from '../entities/country/country.service';
import { RegionService } from '../entities/region/region.service';
import { CityService } from '../entities/city/city.service';
import { PlaceService } from '../entities/place/place.service';
import { SensorIdService } from '../entities/senosor-id/sensor-id.service';
import {SensorService} from "../entities/sensor/sensor.service";
import {PlaceTypeService} from "../entities/place-type/place-type.service";
import {CountryEntity} from "../entities/country/country.entity";
import {RegionEntity} from "../entities/region/region.entity";
import {CityEntity} from "../entities/city/city.entity";
import {PlaceTypeEntity} from "../entities/place-type/place-type.entity";
import {EdgeCollections} from "../common/enums/arango.enums";

@Injectable()
export class ArangoDBService {
    constructor(
        private readonly countryService: CountryService,
        private readonly regionService: RegionService,
        private readonly cityService: CityService,
        private readonly placeService: PlaceService,
        private readonly sensorIdService: SensorIdService,
        private readonly placeTypeService: PlaceTypeService,
        private readonly sensorService:SensorService,
        @InjectManager()
        private readonly databaseManager: ArangoManager,
    ) {}

    async createTreeFromTopic(topic: string): Promise<void> {
        const [countryCode, regionCode, cityCode, placeTypeCode, placeCode, sensorIdCode,sensorCode] = topic.split('/');

        const country: CountryEntity = await this.countryService.create({ code: countryCode, name: null });

        const region:RegionEntity = await this.regionService.create({ code: regionCode, name: null,parent_id:country._id });
        await this.createEdge(EdgeCollections.COUNTRY_REGION.ADGE_NAME, country._id, region._id);

        const city:CityEntity = await this.cityService.create({code: cityCode, name: null, parent_id: region._id });
        await this.createEdge(EdgeCollections.REGION_CITY.ADGE_NAME, region._id, city._id);

        const placeType:PlaceTypeEntity = await this.placeTypeService.create({code: placeTypeCode, name: null, parent_id: city._id });
        await this.createEdge(EdgeCollections.CITY_PLACE_TYPE.ADGE_NAME, city._id, placeType._id);

        const place = await this.placeService.create({code: placeCode, name: null, parent_id: placeType._id });
        await this.createEdge(EdgeCollections.PLACE_TYPE_PLACE.ADGE_NAME, placeType._id, place._id);

        const sensorId = await this.sensorIdService.create({
            code:sensorIdCode,
            name: null,
            parent_id: place._id });
        await this.createEdge(EdgeCollections.PLACE_SENSOR_ID.ADGE_NAME, place._id, sensorId._id);

        const sensor = await this.sensorService.create({code: sensorCode, name: null,sensor_id:'', parent_id: sensorId._id });
        await this.createEdge(EdgeCollections.SENSOR_ID_SENSOR.ADGE_NAME, sensorId._id, sensor._id);
    }



    private async createEdge(edgeCollectionName: string, fromId: string, toId: string): Promise<void> {
        const db = this.databaseManager.database;
        const existingEdge = await this.findEdge(edgeCollectionName, fromId, toId);

        if (!existingEdge) {
            await db.collection(edgeCollectionName).save({ _from: fromId, _to: toId });
        }
    }

    private async findEdge(edgeCollectionName: string, fromId: string, toId: string): Promise<any> {
        const db = this.databaseManager.database;
        const cursor = await db.query(
            `FOR edge IN ${edgeCollectionName} FILTER edge._from == @fromId AND edge._to == @toId RETURN edge`,
            { fromId, toId }
        );
        return cursor.next();
    }
}
