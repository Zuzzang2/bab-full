// auth/google.strategy.ts
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NaverStrategy extends PassportStrategy(Strategy, 'naver') {
    constructor() {
        super({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: 'http://localhost:3000/auth/naver/callback',
            scope: ['email', 'profile'],
        });
    }

    async validate(
        accessToken: string,
        refreshToken: string,
        profile: any,
        done: VerifyCallback,
    ): Promise<any> {
        const { email, nickname, profile_image, name } = profile._json;

        const user = {
            email,
            name: nickname || name,
            picture: profile_image, // 기본 이미지 URL
            accessToken,
        };
        done(null, user);
    }
}
