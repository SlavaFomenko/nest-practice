import {OnModuleInit} from "@nestjs/common";
import {Database} from "arangojs";

export class ArangoService implements OnModuleInit{
    private db: Database;

    onModuleInit() {
        this.db = new Database({
            url: 'http://arangodb:8529', // URL вашей ArangoDB
            databaseName: 'test-db',
            auth: { username: 'root', password: 'root' }, // Ваши учетные данные
        });
        this.createCollection('user-collection');
        this.createCollection('like');
        this.createGraph('social-graph');
        // this.addEdgeCollectionToGraph('social-graph','like',["users"],['users'])
    }

    async createCollection(collectionName: string) {
        const collections = await this.db.listCollections();
        const collectionExists = collections.some(col => col.name === collectionName);
        if (!collectionExists) {
            await this.db.createCollection(collectionName);
            console.log(`Collection ${collectionName} created.`);
        } else {
            console.log(`Collection ${collectionName} already exists.`);
        }
    }

    async createGraph(graphName: string) {
        const graphs = await this.db.listGraphs();
        const graphExists = graphs.some(graph => graph.name === graphName);
        if (!graphExists) {
            const edgeDefinitions = [ //test
                {
                    collection: 'like',
                    from: ['users'],
                    to: ['users'],
                }
            ];
            const graph = await this.db.createGraph(graphName, edgeDefinitions);
            console.log(`Graph ${graphName} created.`);
        } else {
            console.log(`Graph ${graphName} already exists.`);
        }
    }

    async addEdgeCollectionToGraph(graphName: string, edgeCollection: string, fromCollections: string[], toCollections: string[]) {
        const graph = this.db.graph(graphName);

        try {
            await graph.addEdgeDefinition({
                collection: edgeCollection,
                from: fromCollections,
                to: toCollections
            });
            console.log(`Edge collection ${edgeCollection} added to graph ${graphName}.`);
        } catch (error) {
            console.error(`Failed to add edge collection to graph: ${error.message}`);
        }
    }

    async addVertex(graphName: string, vertexCollection: string, vertex: any) {
        const graph = this.db.graph(graphName);
        return await graph.vertexCollection(vertexCollection).save(vertex);
    }

    async addEdge(graphName: string, name: string, from: string, to: string, edge: any) {
        console.log(name)
        const graph = this.db.graph(graphName);
        return await graph.edgeCollection(name).save({
            _from: from,
            _to: to,
            ...edge,
        });
    }

    async createDocument(collectionName: string, document: any): Promise<any> {
        console.log('hello')
        const collection = this.db.collection(collectionName);
        return await collection.save(document);
    }

    async getDocument(collectionName: string, documentKey: string): Promise<any> {
        const collection = this.db.collection(collectionName);
        return await collection.document(documentKey);
    }

    async updateDocument(collectionName: string, documentKey: string, document: any): Promise<any> {
        const collection = this.db.collection(collectionName);
        return await collection.replace(documentKey, document);
    }

    async deleteDocument(collectionName: string, documentKey: string): Promise<any> {
        const collection = this.db.collection(collectionName);
        return await collection.remove(documentKey);
    }

    // async query(queryString: string, bindVars?: any): Promise<any> {
    //     const cursor = await this.db.query(queryString, bindVars);
    //     return cursor.all();
    // }

}