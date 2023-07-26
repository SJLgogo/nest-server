import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { loadConfig } from './config/configurations';
import { AuthModule } from './auth/auth.module';
import { MonitorModule } from './monitor/monitor.module';

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

@Module({
  imports: [
    ...businessModules , ...libModules
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
