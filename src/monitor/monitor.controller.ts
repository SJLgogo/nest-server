import { Body, Controller, Post } from "@nestjs/common";
import { MonitorService } from "./service/monitor.service";
import { MonitorDataDto } from "./dto/new-monitor.dto";


@Controller('monitor')
export class MonitorController{

    constructor(private readonly monitorService:MonitorService){}

    @Post('/add')
    async add(@Body() monitorData: MonitorDataDto) {
        return this.monitorService.add(monitorData)
    }
}