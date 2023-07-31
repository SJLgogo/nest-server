import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto, UpdateUserDto } from "./dto/create-user.dto";
import { User } from "./entities/user.entity";

@Injectable()
export class UserService{

    constructor(
        @InjectRepository(User) private userRepository:Repository<User>,
    ){
    }

    async create(createUserDto:User):Promise<any>{
      try {
        const { username} = createUserDto;
        const doc = await this.userRepository.findOne({ where:{ username } })
        if(doc){
            throw new HttpException('人员已存在',200)
        }
        return this.userRepository.save(createUserDto);
      } catch (error) {
        throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }

    async findAll(){
      // throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
      return this.userRepository.find();
    }

    async findOne(id:number){
        return this.userRepository.findOne({where:{id}});
    }

    async findByUsername(username: string) {
        return this.userRepository.findOne({
          where: { username },
        });
      }

    async update(id: any, updateUserDto: UpdateUserDto) {
      try {
        this.userRepository.update({ id }, updateUserDto);
        return '修改成功'
      } catch (error) {
        return error
      }
    }

    async remove(id: number) {
        return this.userRepository.delete({
          id,
        });
    }
    
      async checkAdmin(id: number) {
        return this.userRepository.findOne({
          where: { id, is_admin: 1 },
        });
    }

}
