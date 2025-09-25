import {
    Injectable,
    UnauthorizedException,
    ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>,
        private jwtService: JwtService,
    ) {}

    async signup(dto: SignupDto) {
        const exists = await this.userRepo.findOne({
            where: [{ email: dto.email }, { nickname: dto.nickname }],
        });
        if (exists)
            if (exists.email === dto.email) {
                throw new ConflictException('이미 가입된 이메일입니다.');
            }
        if (exists?.nickname === dto.nickname) {
            throw new ConflictException('이미 사용 중인 닉네임입니다.');
        }

        const hashed = await bcrypt.hash(dto.password, 10);
        const user = this.userRepo.create({ ...dto, password: hashed });
        await this.userRepo.save(user);

        const payload = { sub: user.id, email: user.email };
        const accessToken = this.jwtService.sign(payload, { expiresIn: '7d' });

        return accessToken;
    }

    async signin(dto: SigninDto) {
        const user = await this.userRepo.findOne({
            where: { email: dto.email },
        });
        if (!user || !(await bcrypt.compare(dto.password, user.password))) {
            throw new UnauthorizedException(
                '이메일 또는 비밀번호가 일치하지 않습니다.',
            );
        }

        const payload = { sub: user.id, email: user.email };
        const accessToken = this.jwtService.sign(payload, { expiresIn: '7d' });

        return accessToken; // 쿠키에는 jwt문자열만 넣어야함.
    }

    async oauthLogin(googleUser: any): Promise<string> {
        const { email, name } = googleUser;

        let user = await this.userRepo.findOne({ where: { email } });

        if (!user) {
            // 신규 가입 처리
            user = this.userRepo.create({
                email,
                nickname: name || `user_${Date.now()}`, // 이름 없으면 임시 닉네임
                password: '', // 소셜 로그인은 패스워드 공백
                provider: 'google',
            });
            await this.userRepo.save(user);
        }

        const payload = { sub: user.id, email: user.email };
        return this.jwtService.sign(payload, { expiresIn: '7d' });
    }

    async completeGoogleSignup(
        email: string,
        nickname: string,
    ): Promise<string> {
        const exists = await this.userRepo.findOne({
            where: [{ email }, { nickname }],
        });

        if (exists) {
            throw new ConflictException(
                '이미 사용 중인 이메일 또는 닉네임입니다.',
            );
        }

        const user = this.userRepo.create({
            email,
            nickname,
            password: '', // 소셜 로그인은 패스워드 없음
            provider: 'google',
        });

        await this.userRepo.save(user);

        const payload = { sub: user.id, email: user.email };
        return this.jwtService.sign(payload, { expiresIn: '7d' });
    }
}
