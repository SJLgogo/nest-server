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

    async validate(payload:any){
        return {userId:payload.sub,username:payload.username}
    }
}