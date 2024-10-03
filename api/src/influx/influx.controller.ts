import {Body, Controller, Get, Post, Req, Res} from '@nestjs/common';
import {InfluxService} from "../influx/influx.service";

@Controller('influx')
export class InfluxController {

    constructor(private readonly influxService: InfluxService) {}

    @Get()
    test(@Req() req: any, @Res() res) {
        return res.status(200).json({message: 'Influx'});
    }

    @Post('data')
    async addData(@Body() data: any) {
        await this.influxService.writeData('test-bucket', 'test_measurement', data);
        return { success: true };
    }
    @Post('rand-data')
    async addRandomData(@Body() data: any) {
        console.log(data)
        await this.influxService.writeRandomData('test-bucket', 'test_measurement', data);
        return { success: true };
    }
}
