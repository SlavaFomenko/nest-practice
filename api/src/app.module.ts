import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TestController } from './test/test.controller';
import { InfluxController } from './influx/influx.controller';
import { InfluxModule } from './influx/influx.module';
import {InfluxService} from "./influx/influx.service";
import { ArangoModule } from 'nest-arango';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {config} from "./config/config";
import {ArangoDBModule} from "./arango/arango.module";
import {AppService} from "./app.service";
import {DatabaseSetupService} from "./arango/database-setup.service";
import {ArangoConfig} from "./config/arango.config";

@Module({
  imports: [
      ConfigModule.forRoot({
          isGlobal: true,
          load:[config]
      }),
      InfluxModule,
      ArangoModule.forRootAsync({
          imports: [ConfigModule],
          useClass: ArangoConfig,
      }),
      ArangoDBModule
  ],
  controllers: [
      AppController,
    TestController,
    InfluxController,
    AppController],
  providers: [DatabaseSetupService,InfluxService,AppService],
})
export class AppModule {}

