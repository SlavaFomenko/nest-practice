import { Injectable } from '@nestjs/common';
import { CountryService } from './services/country.service';
import { RegionService } from './services/region.service';
import { CityService } from './services/city.service';
import { PlaceService } from './services/place.service';
import { SensorIdService } from './services/sensor-id.service';
import { InjectManager, ArangoManager } from 'nest-arango';
import {PlaceTypeService} from "./services/place-type.service";
import {EdgeCollections} from "./const/collections.constants";

@Injectable()
export class ArangoDBService {
    constructor(
        private readonly countryService: CountryService,
        private readonly regionService: RegionService,
        private readonly cityService: CityService,
        private readonly placeService: PlaceService,
        private readonly sensorIdService: SensorIdService,
        private readonly placeTypeService: PlaceTypeService,
        @InjectManager()
        private readonly databaseManager: ArangoManager,
    ) {}

    async createTreeFromTopic(topic: string): Promise<void> {
        const [countryName, regionName, cityName, placeTypeName, placeName, sensorIdName] = topic.split('/');

        const country = await this.countryService.createCountry({code: "", name: countryName });

        const region = await this.regionService.createRegion({code: "", name: regionName, parent_id: country._id });
        await this.createEdge(EdgeCollections.COUNTRY_REGION, country._id, region._id);

        const city = await this.cityService.createCity({code: "", name: cityName, parent_id: region._id });
        await this.createEdge(EdgeCollections.REGION_CITY, region._id, city._id);

        const placeType = await this.placeTypeService.createPlaceType({code: "", name: placeTypeName, parent_id: city._id });
        await this.createEdge(EdgeCollections.CITY_PLACE_TYPE, city._id, placeType._id);

        const place = await this.placeService.createPlace({type: "", name: placeName, parent_id: city._id });
        await this.createEdge(EdgeCollections.PLACE_TYPE_PLACE, placeType._id, place._id);

        const sensorId = await this.sensorIdService.createSensorId({
            status: "",
            name: sensorIdName, parent_id: place._id });
        await this.createEdge(EdgeCollections.PLACE_SENSORID, place._id, sensorId._id);
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
