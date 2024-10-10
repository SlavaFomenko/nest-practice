import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectManager, ArangoManager, Database } from 'nest-arango';
import { Collections, EdgeCollections, GraphName } from '../common/enums/arango.enums';

@Injectable()
export class DatabaseSetupService implements OnModuleInit {
    constructor(
        @InjectManager()
        private readonly databaseManager: ArangoManager,
    ) {}

    async onModuleInit() {
        // this.clearDatabase()
        await this.createCollection(Collections.COUNTRIES);
        await this.createCollection(Collections.REGIONS);
        await this.createCollection(Collections.CITIES);
        await this.createCollection(Collections.PLACE_TYPES);
        await this.createCollection(Collections.PLACES);
        await this.createCollection(Collections.SENSOR_IDS);
        await this.createCollection(Collections.SENSORS);

        await this.createCollection(EdgeCollections.COUNTRY_REGION.ADGE_NAME, true);
        await this.createCollection(EdgeCollections.REGION_CITY.ADGE_NAME, true);
        await this.createCollection(EdgeCollections.CITY_PLACE_TYPE.ADGE_NAME, true);
        await this.createCollection(EdgeCollections.PLACE_TYPE_PLACE.ADGE_NAME, true);
        await this.createCollection(EdgeCollections.PLACE_SENSOR_ID.ADGE_NAME, true);
        await this.createCollection(EdgeCollections.SENSOR_ID_SENSOR.ADGE_NAME, true);

        await this.createGraph();
    }

    async clearDatabase(): Promise<void> {
        const db: Database = this.databaseManager.database;

        const collectionsToClear = [
            ...Object.values(Collections),
            ...Object.values(EdgeCollections).map(edge => edge.ADGE_NAME),
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

    private async createCollection(name: string, isEdge: boolean = false): Promise<void> {
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
        const db = this.databaseManager.database;

        const exists = await db.graph(GraphName.GRAPH).exists();

        if (!exists) {
            const edgeDefinitions = Object.values(EdgeCollections).map(edge => ({
                collection: edge.ADGE_NAME,
                from: [edge.FROM],
                to: [edge.TO],
            }));

            await db.createGraph(GraphName.GRAPH, edgeDefinitions);
            console.log(`Graph ${GraphName.GRAPH} created`);
        } else {
            console.log(`Graph ${GraphName.GRAPH} already exists`);
        }
    }
}

