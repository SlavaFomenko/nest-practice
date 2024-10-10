import { Module } from '@nestjs/common';
import {ArangoDBController} from "./arango.controller.";
import {ArangoDBService} from "./arango.service";
import {CountryService} from "../entities/country/country.service";
import {RegionService} from "../entities/region/region.service";
import {CityService} from "../entities/city/city.service";
import {PlaceService} from "../entities/place/place.service";
import {SensorIdService} from "../entities/senosor-id/sensor-id.service";
import {PlaceTypeService} from "../entities/place-type/place-type.service";
import {SensorService} from "../entities/sensor/sensor.service";

@Module({
    controllers: [ArangoDBController],
    providers: [
        ArangoDBService,
        CountryService,
        RegionService,
        CityService,
        PlaceTypeService,
        PlaceService,
        SensorIdService,
        SensorService,
    ],
})
export class ArangoDBModule {}
