import { Module } from '@nestjs/common';
import {CityService} from "./city.service";


@Module({
    providers: [CityService],
    exports: ['INFLUXDB_CLIENT'],
})
export class CityModule {}
