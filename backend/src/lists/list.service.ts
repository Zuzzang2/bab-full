import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ListEntity } from './list.entity';
import { Repository } from 'typeorm';
import { CreateListDto } from './dto/create-list.dto';

@Injectable()
export class ListService {
    constructor(
        @InjectRepository(ListEntity)
        private readonly listRepo: Repository<ListEntity>,
    ) {}

    async createList(dto: CreateListDto, userId: number) {
        const newList = this.listRepo.create({ ...dto, userId });
        await this.listRepo.save(newList);
        return { message: '리스트가 생성되었습니다.', data: newList };
    }

    async getListsByUser(userId: number) {
        const lists = await this.listRepo.find({
            where: { userId },
            order: { createdAt: 'DESC' },
        });
        return { data: lists };
    }
}
