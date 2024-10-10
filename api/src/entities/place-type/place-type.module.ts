import { Module } from '@nestjs/common';
import {PlaceTypeService} from "./place-type.service";


@Module({
    providers: [PlaceTypeService],
    exports: ['INFLUXDB_CLIENT'],
})
export class PlaceTypeModule {}
