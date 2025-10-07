import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import type { Multer } from 'multer';
import { SupabaseService } from 'src/common/supabase/supabase.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly supabase: SupabaseService,
  ) {}

  async updateNickname(userId: number, newNickname: string) {
    const exists = await this.userRepo.findOne({
      where: { nickname: newNickname },
    });
    if (exists) {
      throw new ConflictException('이미 사용 중인 닉네임입니다.');
    }

    await this.userRepo.update(userId, { nickname: newNickname });

    return { message: '닉네임이 성공적으로 변경되었습니다.' };
  }

  async deleteProfile(userId: number) {
    const result = await this.userRepo.delete(userId);

    if (result.affected === 0) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }

    return { message: '회원 탈퇴가 완료되었습니다.' };
  }

  async uploadProfileImage(userId: number, file: Multer.File) {
    const bucket = 'profile-images';

    // 1. 기존 이미지 URL 가져오기
    const user = await this.userRepo.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('해당 사용자를 찾을 수 없습니다.');
    }

    const oldUrl = user.profileImage;
    const oldFileName = oldUrl?.split('/').pop();

    // 2. 기존 이미지가 있으면 삭제
    if (oldFileName) {
      await this.supabase
        .getClient()
        .storage.from(bucket)
        .remove([oldFileName]);
    }

    // 3. 새 이미지 업로드
    const fileExt = file.originalname.split('.').pop() || 'png';
    const fileName = `user-${userId}-${Date.now()}.${fileExt}`;

    const { error } = await this.supabase
      .getClient()
      .storage.from(bucket)
      .upload(fileName, file.buffer, {
        contentType: file.mimetype,
        upsert: true,
      });

    if (error) {
      if (error.message.includes('file size')) {
        throw new BadRequestException(
          '업로드 가능한 파일 크기는 최대 5MB입니다.',
        );
      }
      if (error.message.includes('MIME type')) {
        throw new BadRequestException('지원하지 않는 파일 형식입니다.');
      }

      throw new InternalServerErrorException('이미지 업로드 실패');
    }
    // 4. public URL 가져오기
    const { data } = this.supabase
      .getClient()
      .storage.from(bucket)
      .getPublicUrl(fileName);

    // 5. DB에 저장
    await this.userRepo.update(userId, { profileImage: data.publicUrl });

    return {
      message: '프로필 이미지가 업로드되었습니다.',
      imageUrl: data.publicUrl,
    };
  }
}
