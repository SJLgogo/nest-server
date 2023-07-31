import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { EVENTTYPES } from "../enum/monitor.enum";

@Entity()
export class Monitor{

    @ApiProperty({ description: 'id' })
    @PrimaryGeneratedColumn()  
    id:number

    @ApiProperty({ description: '时间戳' })
    @Column({ type: 'bigint' }) 
    time: number;
  
    @ApiProperty({ description: '信息' })
    @Column()
    message: string;

    @ApiProperty({ description: 'web页面路由' })
    @Column()
    pageUrl: string;

    @ApiProperty({ description: '项目标识' })
    @Column()
    apikey: string;

    @ApiProperty({ description: '监控类型' })
    @Column({
      type: 'enum',
      enum: EVENTTYPES,
    })
    type: EVENTTYPES;


    @ApiProperty({ description: '接口异常错误码' })
    @Column({ nullable: true })
    status: number;

    @ApiProperty({ description: '源码filename地址' })
    @Column({ nullable: true })
    url: string;

    @ApiProperty({ description: '列数' })
    @Column({ nullable: true })
    column: number;


    @ApiProperty({ description: '行数' })
    @Column({ nullable: true })
    line: number;

    @ApiProperty({ description: '人员ID' })
    @Column({ nullable: true })
    userId: string;

    @ApiProperty({ description: '资源标签名称' })
    @Column({ nullable: true })
    name: string;
  
}