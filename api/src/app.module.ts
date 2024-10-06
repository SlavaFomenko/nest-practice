import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestController } from './test/test.controller';
import { InfluxController } from './influx/influx.controller';
import { InfluxModule } from './influx/influx.module';
import {InfluxService} from "./influx/influx.service";
import {ArangoModule} from "./arango/arango.module";


@Module({
  controllers: [AppController, TestController, InfluxController,AppController],
  providers: [AppService,InfluxService],
  imports: [InfluxModule,ArangoModule],
})
export class AppModule {}
