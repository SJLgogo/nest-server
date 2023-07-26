import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Monitor } from "../entities/monitor.entity";
import { MonitorDataDto } from "../dto/new-monitor.dto";

@Injectable()
export class MonitorService{

    constructor(
        @InjectRepository(Monitor) private monitorRepository:Repository<Monitor>,
    ){}

    async add(monitorData:MonitorDataDto):Promise<any>{
        try {
            this.monitorRepository.save(monitorData);
          } catch (error) {
            return error
          }
    }


}