import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async updateNickname(userId: number, newNickname: string) {
    // 중복 체크
    const exists = await this.userRepo.findOne({
      where: { nickname: newNickname },
    });
    if (exists) {
      throw new ConflictException('이미 사용 중인 닉네임입니다.');
    }

    await this.userRepo.update(userId, { nickname: newNickname });

    return { message: '닉네임이 성공적으로 변경되었습니다.' };
  }
}
