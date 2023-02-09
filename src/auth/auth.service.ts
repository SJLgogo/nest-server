import { Injectable } from '@nestjs/common';
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
