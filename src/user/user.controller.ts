import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseInterceptors } from "@nestjs/common";
import { ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateUserDto, UpdateUserDto } from "./dto/create-user.dto";
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

    @ApiResponse({ type: [User] })
    @UseInterceptors(ClassSerializerInterceptor)
    @Get()
    async findAll() {
      return this.userService.findAll();
    }
  
    @ApiResponse({ type: User })
    @UseInterceptors(ClassSerializerInterceptor)
    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: string) {
      return this.userService.findOne(+id);
    }
  
    @ApiBody({ type: UpdateUserDto })
    @ApiResponse({ type: User })
    @Patch(':id')
    async update(
      @Param('id', ParseIntPipe) id: string,
      @Body() updateUserDto: UpdateUserDto,
    ) {
      return this.userService.update(+id, updateUserDto);
    }
  
    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: string) {
      return this.userService.remove(+id);
    }

}