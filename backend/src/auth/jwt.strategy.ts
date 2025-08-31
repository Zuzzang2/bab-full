import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private config: ConfigService) {
        const jwtSecret = config.get<string>('JWT_SECRET') as string;
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Authorization: Bearer TOKEN
            secretOrKey: jwtSecret,
        });
    }

    async validate(payload: any) {
        console.log(payload);
        return { userId: payload.sub, email: payload.email };
    }
}
