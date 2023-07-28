import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import Redis from "ioredis/built/Redis";
import { resolve } from "path";

@Injectable()
export class RedisService{
    private readonly redisClient: any;
    private readonly listKey = 'cached_monitor_list';
    private handleRedisCount:number = 2

    
    constructor( private configService:ConfigService ){
        const {host , port} = configService.get('redis')
        this.redisClient = new Redis({
            host:host,
            port:port
        })
        if(!this.isRedisAvailable()){
            Logger.error('Redis 不可用')
        }
    }


    // 验证Redis是否可用
    async isRedisAvailable():Promise<boolean>{
        try {
            const result = await this.redisClient.ping()
            return result == 'PONG'
        } catch (error) {
            return false;
        }
    }

    async addToCache(data:any):Promise<void>{
        await this.redisClient.rpush(this.listKey , JSON.stringify(data))
        console.log(await this.getRedisListNameLength(this.listKey));
    }

    /** 获取redis存储数据长度 */
    async getRedisListNameLength(listKey:string):Promise<number>{
        return await this.redisClient.llen(listKey)
    }

    /** 取出redis数据 */
    async getRedisData(listKey:string = this.listKey):Promise<any>{
        const beginListLengtgh =  await this.redisClient.llen(listKey)
        console.log(`beginListLengtgh数量 : ${beginListLengtgh}`);
        if(beginListLengtgh<=0) return
        const start = this.handleRedisCount > beginListLengtgh ? 0 : beginListLengtgh - this.handleRedisCount
        console.log(`开始处理缓存数据 : start:${start} , end:${beginListLengtgh}`);
        const data = await this.redisClient.lrange(listKey,start,beginListLengtgh)
        return data.map((obj:any)=>JSON.parse(obj))
    }

    /** 删除redis数据 */
    async deleteRedisData(list:any[]):Promise<any>{
        try {
            for(let item of list){
                const dataStr = JSON.stringify(item);
                await this.redisClient.lrem(this.listKey, 0, dataStr);
            }
            console.log(`剩余 ${ await this.redisClient.lrange(this.listKey, 0, -1)}`);
        } catch (error) {
            
        }
    }

    async getFromCache(): Promise<any[]> {
        const dataList = await this.redisClient.lrange(this.listKey, 0, -1);
        return dataList.map((item) => JSON.parse(item));
    }






}