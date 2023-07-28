import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MonitorController } from "./monitor.controller";
import { MonitorService } from "./service/monitor.service";
import { Monitor } from "./entities/monitor.entity";
import { RedisService } from "src/redis/redis.service";
import { ConfigService } from "@nestjs/config";
import { RegularService } from "src/monitor/regular/regular.service";
import { ScheduleModule } from "@nestjs/schedule";

@Module({
    controllers:[MonitorController],
    providers:[MonitorService , RedisService , ConfigService , RegularService],
    imports:[TypeOrmModule.forFeature([Monitor])]
})
export class MonitorModule{}