import {
  Controller,
  Get,
  UseGuards,
  Req,
  Patch,
  Body,
  Delete,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserService } from './user.service';
import { UpdateNicknameDto } from './dto/update-nickname.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Multer } from 'multer';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Patch('/nickname')
  updateNickname(@Req() req, @Body() dto: UpdateNicknameDto) {
    return this.userService.updateNickname(req.user.id, dto.nickname);
  }

  @Get('/me')
  getProfile(@Req() req) {
    return req.user;
  }

  @Delete('/me')
  deleteProfile(@Req() req) {
    return this.userService.deleteProfile(req.user.id);
  }

  @Patch('/profile-image')
  @UseInterceptors(FileInterceptor('file'))
  uplodeProfileImage(@UploadedFile() file: Multer.File, @Req() req) {
    return this.userService.uploadProfileImage(req.user.id, file);
  }
}
