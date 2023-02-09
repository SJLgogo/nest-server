import { HttpException, Injectable } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./entities/user.entity";

@Injectable()
export class UserService{

    constructor(
        @InjectRepository(User) private userRepository:Repository<User>,
    ){
    }

    async create(createUserDto:User):Promise<any>{
        const { username} = createUserDto;
        const doc = await this.userRepository.findOne({ where:{ username } })
        if(doc){
            throw new HttpException('人员已存在',200)
        }
        return this.userRepository.save(createUserDto);
    }
}