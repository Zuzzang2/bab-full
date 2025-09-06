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
            where: { email: dto.email },
        });
        if (exists) throw new ConflictException('이미 가입된 이메일입니다.');

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

        return accessToken; // 쿠키에는 jwt문자열만 넣어야함.메세지는 따로 넣기.
    }
}
