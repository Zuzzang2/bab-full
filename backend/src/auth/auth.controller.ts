import {
    Controller,
    Post,
    Body,
    Res,
    Get,
    UseGuards,
    Req,
} from '@nestjs/common';
import type { Response } from 'express';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { AuthGuard } from '@nestjs/passport';

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

    @Get('google')
    @UseGuards(AuthGuard('google'))
    async googleAuth() {
        // Google 로그인 화면으로 리디렉션
    }

    @Get('google/callback')
    @UseGuards(AuthGuard('google'))
    async googleAuthRedirect(
        @Req() req,
        @Res({ passthrough: true }) res: Response,
    ) {
        // 구글 로그인 성공 → 사용자 정보는 req.user 에 있음
        const userInfo = req.user;

        // 로그인 또는 회원가입 처리 → JWT 발급
        const token = await this.authService.oauthLogin(userInfo);

        // JWT를 쿠키에 저장 (secure, httpOnly 설정 포함)
        res.cookie('access_token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 1000 * 60 * 60 * 24 * 7,
        });
        return { message: '구글 로그인 성공!' };
    }

    // 구글 계정에서 동일 이메일인데 일반 회원가입으로 이미 가입된 경우, 소셜 로그인도 허용할까요?
    // 아니면 provider: 'google' 이어야만 로그인 허용할까요?
}
