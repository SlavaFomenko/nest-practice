import { Injectable } from '@nestjs/common';
import { ArangoOptionsFactory } from 'nest-arango';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ArangoConfig implements ArangoOptionsFactory {
    constructor(private configService: ConfigService) {}

    createArangoOptions() {
        return {
            config: {
                url: this.configService.get('ARANGO_DB_URL'),
                databaseName: this.configService.get('ARANGO_DB_NAME'),
                auth: {
                    username: this.configService.get('ARANGO_DB_USERNAME'),
                    password: this.configService.get('ARANGO_DB_PASSWORD'),
                },
            },
        };
    }
}
