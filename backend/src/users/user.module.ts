import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { ConfigModule } from '@nestjs/config';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { SupabaseService } from 'src/common/supabase/supabase.service';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([User])],
  providers: [UserService, SupabaseService],
  controllers: [UserController],
})
export class UserModule {}
