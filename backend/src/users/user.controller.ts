import { Controller, Get, UseGuards, Req, Patch, Body } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserService } from './user.service';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  getProfile(@Req() req) {
    return req.user;
  }

  @Patch('/nickname')
  updateNickname(@Req() req, @Body() body) {
    return this.userService.updateNickname(req.user.id, body.nickname);
  }
}
