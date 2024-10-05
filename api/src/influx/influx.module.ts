import { Module } from '@nestjs/common';
import { InfluxDB } from '@influxdata/influxdb-client';
import { InfluxService } from './influx.service';

@Module({
    providers: [
        {
            provide: 'INFLUXDB_CLIENT',
            useFactory: () => {
                const url = 'http://host.docker.internal:8086';
                const token = 'Iw6oDc4BErxgmva3MmhAjKZnB1eRpYd5GVNfKISYq39qEn1u0hfsMye8QvCbM9mPrMk9iTX59ZskYMFizl9EYw==' //  🫡
                return new InfluxDB({ url, token });
            },
        },
        InfluxService,
    ],
    exports: ['INFLUXDB_CLIENT'],
})
export class InfluxModule {}
