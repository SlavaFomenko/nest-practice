import { Module } from '@nestjs/common';
import {SensorService} from "./sensor.service";


@Module({
    providers: [SensorService],
    exports: ['INFLUXDB_CLIENT'],
})
export class SensorModule {}
