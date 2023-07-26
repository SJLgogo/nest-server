import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MonitorController } from "./monitor.controller";
import { MonitorService } from "./service/monitor.service";
import { Monitor } from "./entities/monitor.entity";

@Module({
    controllers:[MonitorController],
    providers:[MonitorService],
    imports:[TypeOrmModule.forFeature([Monitor])]
})
export class MonitorModule{}