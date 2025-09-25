import {
    Controller,
    Post,
    Body,
    Res,
    Get,
    UseGuards,
    Req,
    UnauthorizedException,
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
        const { email } = req.user;

        //회원가입은 하지 않고 email만 저장
        res.cookie('google_email', email, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 1000 * 60 * 5, // 5분 이내 닉네임 입력
        });

        // 프론트엔드로 리디렉션 (닉네임 입력 폼 페이지)
        res.redirect('http://localhost:5173/set-nickname');
    }

    @Post('google/complete')
    async completeGoogle(
        @Req() req,
        @Res({ passthrough: true }) res: Response,
        @Body() body: { nickname: string },
    ) {
        const email = req.cookies['google_email'];
        if (!email)
            throw new UnauthorizedException('OAuth 세션이 만료되었습니다.');

        const token = await this.authService.completeGoogleSignup(
            email,
            body.nickname,
        );

        // 쿠키 처리
        res.clearCookie('google_email');
        res.cookie('access_token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 1000 * 60 * 60 * 24 * 7,
        });

        return { message: '회원가입 완료' };
    }
}
