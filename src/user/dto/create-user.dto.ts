import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsAlphanumeric, IsEmail, IsNumber, IsNumberString, IsString } from "class-validator";

export class CreateUserDto{

    @ApiProperty({ description: '用户名' })
    @IsAlphanumeric()
    username: string;
  
    @ApiProperty({ description: '密码' })
    @IsString()
    password: string;
  
    @ApiProperty({ required: false, description: '邮箱' })
    @IsEmail()
    email: string;

    @ApiProperty({ required: false, description: '是否管理员' })
    @IsNumber()
    is_admin:number
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
