import { Injectable, Inject } from '@nestjs/common';
import {InfluxDB, Point} from '@influxdata/influxdb-client';
import {log} from "node:util";

@Injectable()
export class InfluxService {
    constructor(@Inject('INFLUXDB_CLIENT') private readonly influxDB: InfluxDB) {}

    async writeData(bucket: string, measurement: string, data: any) {
        const writeApi = this.influxDB.getWriteApi('test-org', bucket);

        console.log(data)
        const point = new Point(measurement)
            .tag('sensor', 'sens-5')
            .floatField("value", data.value)
            // .timestamp('2025.06.05 14:44:00')
            // .timestamp(Date.UTC(2025, 9, 24, 14, 15, 22));
            // .timestamp(new Date("2025-10-03T18:31:20.000Z"));

        writeApi.writePoint(point);
        await writeApi.close();
    }

    async writeRandomData(bucket: string, measurement: string, data: any) {
        const writeApi = this.influxDB.getWriteApi('test-org', bucket);
        console.log(data);

        let currentTime = Date.now();
        console.log(`Points quantity: ${data.pointsQuantity}`);

        for (let i = 0; i < data.pointsQuantity; i++) {
            const randNum: number = Math.floor(Math.random() * 5) - 2;
            const point = new Point(measurement)
                .tag('sensor', data.sensorValue)
                .floatField('value', data.value + randNum)
                .timestamp(new Date('2025-08-24T14:15:22Z'));
            try {
                writeApi.writePoint(point);
            } catch (error) {
                console.error('Error writing point:', error);
            }
            // await new Promise(resolve => setTimeout(resolve, 30)); // Задержка
        }

        await writeApi.close();
        console.log('Finished writing points');
    }




}
