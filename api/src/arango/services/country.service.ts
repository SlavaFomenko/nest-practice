import { Injectable } from '@nestjs/common';
import { InjectManager, ArangoManager } from 'nest-arango';
import { CountryEntity } from '../entities/country.entity';

@Injectable()
export class CountryService {
    constructor(
        @InjectManager()
        private readonly databaseManager: ArangoManager,
    ) {}

    async createCountry(countryData: Partial<CountryEntity>): Promise<CountryEntity> {
        const db = this.databaseManager.database;

        if (!countryData.name) {
            throw new Error('Country name is required');
        }

        const existingCountry = await this.getCountryByName(countryData.name);
        if (existingCountry) {
            return existingCountry;
        }

        const result = await db.collection('Countries').save(countryData);
        return { ...countryData, _id: result._id, _key: result._key, _rev: result._rev } as CountryEntity;
    }

    async getCountryByName(name: string): Promise<CountryEntity | null> {
        const db = this.databaseManager.database;
        const cursor = await db.query(
            `FOR country IN Countries FILTER country.name == @name RETURN country`,
            { name }
        );
        return cursor.next();
    }

    async getAllCountries(): Promise<CountryEntity[]> {
        const db = this.databaseManager.database;
        const cursor = await db.query('FOR country IN Countries RETURN country');
        return cursor.all();
    }
}
