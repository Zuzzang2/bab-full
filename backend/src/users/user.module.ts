import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { ConfigModule } from '@nestjs/config';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { SupabaseModule } from 'src/common/supabase/supabase.module';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([User]), SupabaseModule],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
