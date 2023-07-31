import { Body, Controller, Post, Req } from "@nestjs/common";
import { MonitorService } from "./service/monitor.service";
import { MonitorDataDto } from "./dto/new-monitor.dto";


@Controller('monitor')
export class MonitorController{

    constructor(private readonly monitorService:MonitorService){}

    @Post('/add')
    async add(@Body() monitorData: MonitorDataDto , @Req() request: any) {
        return this.monitorService.add(monitorData)
    }
}