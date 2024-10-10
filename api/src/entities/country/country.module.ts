import { Module } from '@nestjs/common';
import {CountryService} from "./country.service";


@Module({
    providers: [CountryService],
    exports: ['INFLUXDB_CLIENT'],
})
export class CountryModule {}
