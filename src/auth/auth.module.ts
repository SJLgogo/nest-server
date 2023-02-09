import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { PassportModule } from '@nestjs/passport';

@Module({
    controllers:[AuthController],
    providers:[AuthService , LocalAuthGuard],
    imports:[
        PassportModule,
        UserModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: `${jwtConstants.expiresIn}m` },
          }),],
    exports:[]
})
export class AuthModule {}
