import { Injectable } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { MonitorService } from "../service/monitor.service";

@Injectable()
export class RegularService{

    constructor(
      private monitorService:MonitorService
    ){}

    @Cron('*/10 * * * * *') // 这里设置 Cron 表达式，表示每隔10秒触发一次
    handleCron() {
      this.monitorService.batchToMysql()
    }
}