import { Module } from '@nestjs/common';
import {ArangoController} from "../arango-test/arango.controller";
import {ArangoDBController} from "./arango.controller.";
import {ArangoDBService} from "./arango.service";
import {CountryService} from "./services/country.service";
import {RegionService} from "./services/region.service";
import {CityService} from "./services/city.service";
import {PlaceService} from "./services/place.service";
import {SensorService} from "./services/sensor.service";

@Module({
    controllers: [ArangoDBController],
    providers: [
        ArangoDBService,
        CountryService,
        RegionService,
        CityService,
        PlaceService,
        SensorService,
    ],
})
export class ArangoDBModule {}
