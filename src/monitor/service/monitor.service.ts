import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Monitor } from "../entities/monitor.entity";
import { MonitorDataDto } from "../dto/new-monitor.dto";
import { RedisService } from "src/redis/redis.service";

@Injectable()
export class MonitorService{

    constructor(
        @InjectRepository(Monitor) private monitorRepository:Repository<Monitor>,
        private redisService:RedisService 
    ){}

    async add(monitorData:MonitorDataDto):Promise<any>{
        try {
            this.redisService.addToCache(monitorData)
          } catch (error) {
            return error
          }
    }


    /** 批量写入数据 */
    async batchToMysql():Promise<any>{
      try {
        const monitorEventList =  await this.redisService.getRedisData()  
        if(!monitorEventList) return
        await this.redisService.deleteRedisData(monitorEventList)
        await this.monitorRepository.save(monitorEventList);
      } catch (error) {
        Logger.error(error)
      }
    }


}