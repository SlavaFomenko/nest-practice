import {Body, Controller, Post} from '@nestjs/common';
import {ArangoDBService} from "./arango.service";

@Controller('arango')
export class ArangoDBController {
    constructor(private readonly arangoDBService: ArangoDBService) {}

    @Post('create-tree-from-topic')
    createTreeFromTopic(@Body() body) {
        return this.arangoDBService.createTreeFromTopic(body.topic);
    }
}