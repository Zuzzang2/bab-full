import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private config: ConfigService) {
        const jwtSecret = config.get<string>('JWT_SECRET') as string;
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (req: Request) => {
                    const token = req?.cookies?.access_token;
                    console.log('🍪 access_token from cookie:', token);
                    return token;
                },
            ]),
            secretOrKey: jwtSecret,
        });
    }

    async validate(payload: any) {
        console.log('paload:' + payload);
        return { userId: payload.sub, email: payload.email };
    }
}
