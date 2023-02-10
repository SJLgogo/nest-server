import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User{
    @ApiProperty({ description: 'id' })
    @PrimaryGeneratedColumn()  
    id:number

    @ApiProperty({ description: '姓名' })
    @Column({ length: 500 })
    username: string;

    @ApiProperty({ description: '密码' })
    @Column({ length: 500 })
    password: string;

    @ApiProperty({ description: '邮箱' })
    @Column({ length: 500 })
    email: string;

    @ApiProperty({ description: '是否为管理员' })
    @Column('int', { default: 1 })
    is_admin?: number;

    @ApiProperty({ description: '角色' })
    roles?: string[];
}