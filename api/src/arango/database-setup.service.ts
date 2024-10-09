import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectManager, ArangoManager } from 'nest-arango';
import {Collections, EdgeCollections, Graph} from './const/collections.constants';

@Injectable()
export class DatabaseSetupService implements OnModuleInit {
    constructor(
        @InjectManager()
        private readonly databaseManager: ArangoManager,
    ) {}

    async onModuleInit() {
        this.clearDatabase()
        await this.createCollection(Collections.COUNTRIES);
        await this.createCollection(Collections.REGIONS);
        await this.createCollection(Collections.CITIES);
        await this.createCollection(Collections.PLACES);
        await this.createCollection(Collections.SENSORS);

        await this.createCollection(EdgeCollections.COUNTRY_REGION, true);
        await this.createCollection(EdgeCollections.REGION_CITY, true);
        await this.createCollection(EdgeCollections.CITY_PLACE, true);
        await this.createCollection(EdgeCollections.PLACE_SENSOR, true);

        await this.createGraph();
    }
    async clearDatabase(): Promise<void> {
        const db = this.databaseManager.database;

        // Список всех коллекций, которые нужно очистить
        const collectionsToClear = [
            'Countries',
            'Regions',
            'Cities',
            'Places',
            'Sensors',
            'CountryRegionEdges',
            'RegionCityEdges',
            'CityPlaceEdges',
            'PlaceSensorEdges'
        ];

        for (const collectionName of collectionsToClear) {
            const collection = db.collection(collectionName);
            const exists = await collection.exists();

            if (exists) {
                await collection.truncate(); // Очищает коллекцию, удаляя все документы
                console.log(`Collection ${collectionName} cleared`);
            } else {
                console.log(`Collection ${collectionName} does not exist`);
            }
        }
    }

    private async createCollection(name: string, isEdge: boolean = false) {
        const db = this.databaseManager.database;
        const exists = await db.collection(name).exists();

        if (!exists) {
            if (isEdge) {
                await db.createEdgeCollection(name);
            } else {
                await db.createCollection(name);
            }
            console.log(`Collection ${name} created`);
        } else {
            console.log(`Collection ${name} already exists`);
        }
    }
    private async createGraph() {
        const db = this.databaseManager.database;

        const exists = await db.graph(Graph).exists();

        if (!exists) {
            await db.createGraph(Graph, [
                {
                    collection: EdgeCollections.COUNTRY_REGION,
                    from: [Collections.COUNTRIES],
                    to: [Collections.REGIONS],
                },
                {
                    collection: EdgeCollections.REGION_CITY,
                    from: [Collections.REGIONS],
                    to: [Collections.CITIES],
                },
                {
                    collection: EdgeCollections.CITY_PLACE,
                    from: [Collections.CITIES],
                    to: [Collections.PLACES],
                },
                {
                    collection: EdgeCollections.PLACE_SENSOR,
                    from: [Collections.PLACES],
                    to: [Collections.SENSORS],
                },
            ]);
            console.log(`Graph ${Graph} created`);
        } else {
            console.log(`Graph ${Graph} already exists`);
        }
    }

}
