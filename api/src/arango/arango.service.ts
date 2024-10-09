import { Injectable } from '@nestjs/common';
import { CountryService } from './services/country.service';
import { RegionService } from './services/region.service';
import { CityService } from './services/city.service';
import { PlaceService } from './services/place.service';
import { SensorService } from './services/sensor.service';
import { InjectManager, ArangoManager } from 'nest-arango';

@Injectable()
export class ArangoDBService {
    constructor(
        private readonly countryService: CountryService,
        private readonly regionService: RegionService,
        private readonly cityService: CityService,
        private readonly placeService: PlaceService,
        private readonly sensorService: SensorService,
        @InjectManager()
        private readonly databaseManager: ArangoManager,
    ) {}

    async createTreeFromTopic(topic: string): Promise<void> {
        const [countryName, regionName, cityName, placeName, sensorName] = topic.split('/');

        const country = await this.countryService.createCountry({ name: countryName });

        const region = await this.regionService.createRegion({ name: regionName, parent_id: country._id });
        await this.createEdge('CountryRegionEdges', country._id, region._id);

        const city = await this.cityService.createCity({ name: cityName, parent_id: region._id });
        await this.createEdge('RegionCityEdges', region._id, city._id);

        const place = await this.placeService.createPlace({ name: placeName, parent_id: city._id });
        await this.createEdge('CityPlaceEdges', city._id, place._id);

        const sensor = await this.sensorService.createSensor({ name: sensorName, parent_id: place._id });
        await this.createEdge('PlaceSensorEdges', place._id, sensor._id);
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
