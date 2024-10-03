import {Body, Controller, Get, Post, Req} from '@nestjs/common';
import {Request} from "express";
import {InfluxService} from "../influx/influx.service";

@Controller('test')
export class TestController {

    constructor(private readonly influxService: InfluxService) {}

    @Get()
        test(@Req() request: Request) {

            return "test get";
        }
    @Post()
    async addData(@Body() data: any) {
        console.log(data)
        await this.influxService.writeData('test-bucket', 'test_measurement', data);
        return { success: true };
    }
}
