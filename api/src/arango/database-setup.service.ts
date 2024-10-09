import { Injectable, OnModuleInit } from '@nestjs/common';
import {InjectManager, ArangoManager, Database} from 'nest-arango';
import {Collections, EdgeCollections, GraphName} from './const/collections.constants';

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
        await this.createCollection(Collections.PLACE_TYPES);
        await this.createCollection(Collections.PLACES);
        await this.createCollection(Collections.SENSORIDS);

        await this.createCollection(EdgeCollections.COUNTRY_REGION, true);
        await this.createCollection(EdgeCollections.REGION_CITY, true);
        await this.createCollection(EdgeCollections.CITY_PLACE_TYPE, true);
        await this.createCollection(EdgeCollections.PLACE_TYPE_PLACE, true);
        await this.createCollection(EdgeCollections.PLACE_SENSORID, true);

        await this.createGraph();
    }
    async clearDatabase(): Promise<void> {
        const db:Database = this.databaseManager.database;


        const collectionsToClear = [
            ...Object.values(Collections),
            ...Object.values(EdgeCollections),
        ];

        for (const collectionName of collectionsToClear) {
            const collection = db.collection(collectionName);
            const exists = await collection.exists();

            if (exists) {
                await collection.truncate();
                console.log(`Collection ${collectionName} cleared`);
            } else {
                console.log(`Collection ${collectionName} does not exist`);
            }
        }
    }

    private async createCollection(name: string, isEdge: boolean = false):Promise<void> {
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
    private async createGraph(): Promise<void> {
        const db  = this.databaseManager.database;

        const exists = await db.graph(GraphName.GRAPH).exists();

        if (!exists) {
            await db.createGraph(GraphName.GRAPH, [
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
                    collection: EdgeCollections.CITY_PLACE_TYPE,
                    from: [Collections.CITIES],
                    to: [Collections.PLACE_TYPES],
                },
                {
                    collection: EdgeCollections.PLACE_TYPE_PLACE,
                    from: [Collections.PLACE_TYPES],
                    to: [Collections.PLACES],
                },
                {
                    collection: EdgeCollections.PLACE_SENSORID,
                    from: [Collections.PLACES],
                    to: [Collections.SENSORIDS],
                },
            ]);
            console.log(`Graph ${GraphName.GRAPH} created`);
        } else {
            console.log(`Graph ${GraphName.GRAPH} already exists`);
        }
    }

}
