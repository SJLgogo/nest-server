import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";

/**
 * LocalStrategy 是 Passport 库的一个内置的策略
 * LocalStrategy 的工作原理是：它使用用户名和密码（经过哈希处理），从数据库中查找用户的凭据，并验证其正确性。如果凭据有效，则将用户登录到应用程序，然后将令牌写入会话或存储在 cookie 中，以便用户能够直接访问保护资源而无需重新登录。
 */
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService:AuthService){
        super()
    }

    // 验证
    async validate(username:string,password:string):Promise<any>{
        const user = await this.authService.validateUser(username,password)
        if(!user){
            throw new UnauthorizedException()
        }
        return user
    }
}