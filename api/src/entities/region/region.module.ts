import { Module } from '@nestjs/common';
import {RegionService} from "./region.service";


@Module({
    providers: [RegionService],
    exports: ['INFLUXDB_CLIENT'],
})
export class RegionModule {}
