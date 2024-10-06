import { Controller, Get, Post, Put, Delete, Body, Param } from "@nestjs/common";
import { ArangoService } from "./arango.service";

@Controller("arango")
export class ArangoController {
    constructor(private readonly arangoService: ArangoService) {}

    @Get('say-hello')
    sayHello() {
        return 'Say Hello!';
    }

    @Get(':key')
    async get(@Param('key') key: string) {
        console.log(key)
        return await this.arangoService.getDocument('user-collection', key);
    }

    @Post('vertices')
    async createVertex(@Body() vertex: any) {
        return await this.arangoService.addVertex('social-graph', 'users', vertex);
    }

    @Post('edges')
    async createEdge(@Body() edgeData: { from: string; to: string; name:string; edge: any }) {
        return await this.arangoService.addEdge('social-graph', edgeData.name, edgeData.from, edgeData.to, edgeData.edge);
    }

    @Post()
    async create(@Body() document: any) {
        return await this.arangoService.createDocument('user-collection', document);
    }

    @Put(':key')
    async update(@Param('key') key: string, @Body() document: any) {
        return await this.arangoService.updateDocument('user-collection', key, document);
    }

    @Delete(':key')
    async delete(@Param('key') key: string) {
        return await this.arangoService.deleteDocument('user-collection', key);
    }
}
