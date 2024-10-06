import {Module} from "@nestjs/common";
import {ArangoController} from "./arango.controller";
import {ArangoService} from "./arango.service";

@Module({
    providers: [ArangoService],
    controllers: [ArangoController],
    exports:[ArangoService]
    }
)
export class ArangoModule {}