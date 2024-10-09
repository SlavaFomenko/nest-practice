import { Module } from '@nestjs/common';
import {ArangoDBController} from "./arango.controller.";
import {ArangoDBService} from "./arango.service";
import {CountryService} from "./services/country.service";
import {RegionService} from "./services/region.service";
import {CityService} from "./services/city.service";
import {PlaceService} from "./services/place.service";
import {SensorIdService} from "./services/sensor-id.service";
import {PlaceTypeService} from "./services/place-type.service";

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
    ],
})
export class ArangoDBModule {}
