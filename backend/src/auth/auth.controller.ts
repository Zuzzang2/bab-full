import { Controller, Post, Body, Res } from '@nestjs/common';
import type { Response } from 'express';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('signup')
    async signup(
        @Res({ passthrough: true }) res: Response,
        @Body() dto: SignupDto,
    ) {
        const token = await this.authService.signup(dto);

        res.cookie('access_token', token, {
            httpOnly: true,
            // secure: false, // HTTPS 환경에서만..인데 sameSite 때문에 true
            secure: true,
            sameSite: 'none',
            maxAge: 1000 * 60 * 60 * 24 * 7,
        });

        return { message: '회원가입 성공!' };
    }

    @Post('signin')
    async signin(
        @Res({ passthrough: true }) res: Response,
        @Body() dto: SigninDto,
    ) {
        const token = await this.authService.signin(dto);

        res.cookie('access_token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 1000 * 60 * 60 * 24 * 7,
        });

        return { message: '로그인 성공!' };
    }

    @Post('signout')
    async signout(@Res({ passthrough: true }) res: Response) {
        res.clearCookie('access_token', {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 1000 * 60 * 60 * 24 * 7,
        });

        return { message: '로그아웃 성공!' };
    }
}
