import { Module } from '@nestjs/common';
import {PlaceService} from "./place.service";


@Module({
    providers: [PlaceService],
    exports: ['INFLUXDB_CLIENT'],
})
export class PlaceModule {}
