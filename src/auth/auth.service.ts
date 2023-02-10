import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
      ) {}


    async validateUser(
        username: string,
        password: string,
      ): Promise<null | Omit<User, 'password'>> {
        const existUser = await this.userService.findByUsername(username);
        if (!existUser) {
          throw new HttpException('用户不存在',200)
        }
        if(existUser.password != password){
          throw new HttpException('密码不正确',200)
        }
        const { password: ignorePass, ...restUser } = existUser;
        return restUser;
      }
    

    async login(user: User) {
        const { password, ...restUser } = user;
        const payload = { ...restUser, sub: user.id };
        return {
          token: this.jwtService.sign(payload),
          user: restUser,
          expiresIn: jwtConstants.expiresIn,
        };
      }
}
