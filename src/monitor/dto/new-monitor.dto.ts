import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { EVENTTYPES } from "../enum/monitor.enum";

export class MonitorDataDto {

    // 时间戳
    @IsNumber()
    time: number;

    // 信息
    @IsString()
    message: string;

    // 类型
    @IsEnum(EVENTTYPES)
    type: EVENTTYPES

    // 页面路由
    @IsString()
    pageUrl: string;

    // 项目标识
    @IsString()
    apikey: string;

    // 用户Id
    @IsOptional()
    @IsString()
    userId: string;

    // 源码filename 
    @IsOptional()
    @IsString()
    url: string;

    // 源码行数
    @IsOptional()
    @IsNumber()
    line: number;

    // 源码列数
    @IsOptional()
    @IsNumber()
    column: number;

    // 标签名
    @IsOptional()
    @IsString()
    name: string;


}