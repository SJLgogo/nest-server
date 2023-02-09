import { Body, ClassSerializerInterceptor, Controller, Post, UseInterceptors } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./entities/user.entity";
import { UserService } from "./user.service";

@ApiTags('用户详情')
@Controller('user')
export class UserController{
    constructor(private readonly userService:UserService){}
    
    @ApiResponse({ type: User })
    @UseInterceptors(ClassSerializerInterceptor)
    @Post('/create')
    async create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto as User);
      }
}