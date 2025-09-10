import { Controller, Post, Get, Body, Req, UseGuards } from '@nestjs/common';
import { ListService } from './list.service';
import { CreateListDto } from './dto/create-list.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('lists')
@UseGuards(JwtAuthGuard) // 로그인된 사용자만 접근 가능
export class ListController {
    constructor(private readonly listService: ListService) {}

    @Post()
    async createList(@Req() req, @Body() dto: CreateListDto) {
        const userId = req.user.id;
        return this.listService.createList(dto, userId);
    }

    @Get()
    async getMyLists(@Req() req) {
        const userId = req.user.id;
        return this.listService.getListsByUser(userId);
    }
}
