import { Injectable, Inject } from '@nestjs/common';
import {FluxTableMetaData, InfluxDB, Point} from '@influxdata/influxdb-client';


@Injectable()
export class InfluxService {
    constructor(@Inject('INFLUXDB_CLIENT') private readonly influxDB: InfluxDB) {}

    async writeData(bucket: string, measurement: string, data: any) {
        const writeApi = this.influxDB.getWriteApi('test-org', bucket);

        console.log(data)
        console.log('writeData')
        const point = new Point(measurement)
            .tag('sensor', 'sens-7')
            .floatField("temp",  data.value)

        writeApi.writePoint(point);
        await writeApi.close();
    }

    async writeRandomData(bucket: string, measurement: string, data: any) {
        console.log('hello')

        const writeApi = this.influxDB.getWriteApi('test-org', bucket);
        for (let i = 0; i < 150; i++) {
            const randNum: number = Math.floor(Math.random() * 10) - 2;
            const point = new Point('test_measurement3')
                .tag('sensor', data.sensorValue)
                .floatField('value', data.value + randNum )
            await new Promise(resolve => setTimeout(resolve, 30));
            writeApi.writePoint(point);
            // await writeApi.flush();
        }
            await writeApi.close();
    }

    async writeOrUpdateData(bucket: string, measurement: string, data: any) {
        const writeApi = this.influxDB.getWriteApi('test-org', bucket);

        const point = new Point(measurement)
            .tag('sensor', data.sensor || 'sens-6')
            .floatField("value", data.value)
            .timestamp(data.timestamp);

        writeApi.writePoint(point);

        await writeApi.close();
        console.log('Point written or updated successfully');
    }
    async queryData(bucket: string, measurement: string, start: string, stop: string, filters?: any) {
        const queryApi = this.influxDB.getQueryApi('test-org');

        let fluxQuery = `
      from(bucket: "${bucket}")
      |> range(start: ${start})
      |> filter(fn: (r) => r._measurement == "${measurement}")

    `;
        // filters = {
            // _field:`"temp"`,
            // _value:40
        // }
    //     from(bucket: "bucket")
    //          |> range(start: -24h)
    //          |> filter(fn: (r) => r._measurement == "temperature")
    //          |> filter(fn: (r) => r._field == "temp" and r._value == 10)
        if (filters) {
            for (const [key, value] of Object.entries(filters)) {
                fluxQuery += `|> filter(fn: (r) => r["${key}"] == ${value})\n`;
            }
        }

        try {
            const data = [];
            await queryApi.collectRows(fluxQuery, (row: any[], tableMeta: FluxTableMetaData) => {
                const record = tableMeta.toObject(row);
                data.push(record);
            });

            return data;
        } catch (error) {
            console.error('Error querying data:', error);
            throw error;
        }
    }

}
