import {Body, Controller, Get, Post, Query, Req, Res} from '@nestjs/common';
import {InfluxService} from "../influx/influx.service";

@Controller('influx')
export class InfluxController {

    constructor(private readonly influxService: InfluxService) {}

    @Get( "say-hello")
    test(@Req() req: any, @Res() res) {
        return res.status(200).json({message: 'Influx'});
    }

    @Get()
    async getPoints(@Query() query: any) {
        return this.influxService.queryData('test-bucket','test_measurement4',query.start,query.stop)
    }

    @Post('data')
    async addData(@Body() data: any) {
        await this.influxService.writeData('test-bucket', 'test_measurement4', data);
        return { success: true };
    }
    @Post('rand-data')
    async addRandomData(@Body() data: any) {
        // console.log(data)
        await this.influxService.writeRandomData('test-bucket', 'test_measurement3', data);
        return { success: true };
    }
    @Post('rewrite-data')
    async rewriteData(@Body() data: any) {

        await this.influxService.writeOrUpdateData('test-bucket', 'test_measurement', data);
    }
}
