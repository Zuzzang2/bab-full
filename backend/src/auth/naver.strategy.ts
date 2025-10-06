// auth/google.strategy.ts
import { PassportStrategy } from '@nestjs/passport';
import { Strategy as NaverStrategyOrigin } from 'passport-naver';
import { Profile, VerifyCallback } from 'passport-naver';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NaverStrategy extends PassportStrategy(
  NaverStrategyOrigin,
  'naver',
) {
  constructor() {
    super({
      clientID: process.env.X_NAVER_CLIENT_ID,
      clientSecret: process.env.X_NAVER_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/naver/callback',
      authType: 'reprompt', // 매 로그인시 계정 선택
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
