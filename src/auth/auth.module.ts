import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { LocalAuthGuard } from './guard/loacl-auth.guard';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';


@Module({
    imports:[UserModule , PassportModule ,
    JwtModule.register({
        secret:jwtConstants.secret,
        signOptions:{ expiresIn:`${jwtConstants.expiresIn}m`}
    })
    ],
    exports:[LocalAuthGuard,AuthService],
    providers:[AuthService , LocalStrategy , LocalAuthGuard , JwtStrategy],
    controllers:[AuthController]
})
export class AuthModule {}
