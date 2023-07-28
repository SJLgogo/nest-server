import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { loadConfig } from './config/configurations';
import { AuthModule } from './auth/auth.module';
import { MonitorModule } from './monitor/monitor.module';
import { BullModule } from '@nestjs/bull';
import { RedisService } from './redis/redis.service';
import { ScheduleModule } from '@nestjs/schedule';

const businessModules = [
  UserModule,
  AuthModule,
  MonitorModule
]



const libModules=[
  ConfigModule.forRoot({
    load: [loadConfig],
    envFilePath: ['.env'],
  }),
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService):any => {
      const { host, port, username, password, database } =
        configService.get('mysql')
      return {
        type: 'mysql',
        host,
        port,
        username,
        password,
        database,
        autoLoadEntities: true,  
        synchronize:true  
      };
    },
  }),
]


const redisModule = [ 
  BullModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory:(configService:ConfigService):any=>{
      const { host, port } = configService.get('redis')
      return {
        host:'localhost',
        port:6379
      }
    }
  }),
  ScheduleModule.forRoot()  // 整个应用程序中使用定时任务功能
]

@Module({
  imports: [
    ...businessModules , ...libModules , ...redisModule
  ],
  controllers: [AppController],
  providers: [AppService , RedisService ],
})
export class AppModule {}
