import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestController } from './test/test.controller';
import { InfluxController } from './influx/influx.controller';
import { InfluxModule } from './influx/influx.module';
import {InfluxService} from "./influx/influx.service";


@Module({
  controllers: [AppController, TestController, InfluxController],
  providers: [AppService,InfluxService],
  imports: [InfluxModule],
})
export class AppModule {}
