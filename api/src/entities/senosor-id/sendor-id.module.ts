import { Module } from '@nestjs/common';
import {SensorIdService} from "./sensor-id.service";


@Module({
    providers: [SensorIdService],
    exports: ['INFLUXDB_CLIENT'],
})
export class SendorIdModule {}
