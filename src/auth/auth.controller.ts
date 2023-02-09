import { Controller, Post, UseGuards ,Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@ApiTags('登录验证')
@Controller('auth')
export class AuthController {

    constructor(private readonly authService:AuthService){}

    @UseGuards(LocalAuthGuard)
    @Post('/login')
    async login(@Request() req){
        return this.authService.login(req.user);
    }
}
