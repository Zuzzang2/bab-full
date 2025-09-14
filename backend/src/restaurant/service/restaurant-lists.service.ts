import { Injectable } from '@nestjs/common';
import { RestaurantListsRepository } from '../repository/restaurant-lists.repository';
import { CreateRestaurantListsDto } from '../dto/create-restaurant-lists.dto';

@Injectable()
export class RestaurantListsService {
    constructor(
        private readonly restaurantListsRepo: RestaurantListsRepository,
    ) {}

    // 리스트 생성
    async createList(dto: CreateRestaurantListsDto, userId: number) {
        const newList = this.restaurantListsRepo.create({ ...dto, userId });
        await this.restaurantListsRepo.save(newList);
        return { data: newList, message: '리스트 생성 성공', statusCode: 201 };
    }

    // 리스트 목록 전체 조회
    async findAllListsByUser(userId: number) {
        const lists = await this.restaurantListsRepo.find({
            where: { userId },
            order: { createdAt: 'DESC' },
        });
        return { data: lists, message: '리스트 조회 성공', statusCode: 200 };
    }
}
