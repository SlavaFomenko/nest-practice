import { Injectable } from '@nestjs/common';
import { InjectManager, ArangoManager } from 'nest-arango';
import { CountryEntity } from '../entities/country.entity';
import { Collections } from '../const/collections.constants';
import { BaseService} from "./base.service";


@Injectable()
export class CountryService extends BaseService<CountryEntity> {
    protected type = Collections.COUNTRIES;

    constructor(@InjectManager() databaseManager: ArangoManager) {
        super(databaseManager, Collections.COUNTRIES);
    }
}
