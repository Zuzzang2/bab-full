import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { ConfigModule } from '@nestjs/config';
import { UserController } from './user.controller';

@Module({
    imports: [ConfigModule, TypeOrmModule.forFeature([User])],
    providers: [],
    controllers: [UserController],
})
export class UserModule {}
