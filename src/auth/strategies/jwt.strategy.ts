import { Logger } from "@nestjs/common/services";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { jwtConstants } from "../constants";

export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(){
        super({
            jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),  // 提供从请求头中提取JWT的方法。在api请求头中 加入 bearer 的请求头
            ignoreExpiration:false,     // 确保JWT未过期
            secretOrKey:jwtConstants.secret 
        })
    }   

    // jwt验证 通过获取请求头中 Authorization 信息 提取用户信息
    async validate(payload:any){
        return {userId:payload.sub,username:payload.username, roles: payload.roles || []}
    }
}