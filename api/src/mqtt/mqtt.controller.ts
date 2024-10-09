import { Controller, Post, Body } from '@nestjs/common';
import { MqttService } from './mqtt.service';
import {Ctx, MessagePattern, MqttContext, Payload} from "@nestjs/microservices";

@Controller('mqtt')
export class MqttController {
    constructor(private readonly mqttService: MqttService) {}

    // @Post('topic/name')
    // publish(@Body() body: { topic: string; message: string }) {
    //     this.mqttService.publish(body.topic, body.message);
    //     return { success: true };
    // }



    @MessagePattern('#')
    getNotifications(@Payload() data: number[], @Ctx() context: MqttContext) {
        console.log(`Topic: ${context.getTopic()}`);
        console.log(data)
    }
}
