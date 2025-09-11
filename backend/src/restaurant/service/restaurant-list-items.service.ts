import { Injectable, NotFoundException } from '@nestjs/common';
import { RestaurantListItemsRepository } from '../repository/restaurant-list-items.repository';
import { CreateRestaurantListItemsDto } from '../dto/create-restaurant-list-items.dto';
import { RestaurantListsRepository } from '../repository/restaurant-lists.repository';
import { RestaurantRepository } from '../repository/restaurant.repository';

@Injectable()
export class RestaurantListItemsService {
    constructor(
        private readonly restaurantListItemsRepo: RestaurantListItemsRepository,
        private readonly restaurantListsRepo: RestaurantListsRepository,
        private readonly restaurantRepo: RestaurantRepository,
    ) {}

    async createListRows(dto: CreateRestaurantListItemsDto, userId: number) {
        const list = await this.restaurantListsRepo.findOne({
            where: { userId, id: dto.listId },
            select: ['id'],
        });
        if (!list) {
            throw new NotFoundException('리스트가 존재하지 않습니다.');
        }
        const restaurant = await this.restaurantRepo.findOne({
            where: { userId, id: dto.restaurantId },
            select: ['id'],
        });
        if (!restaurant) {
            throw new NotFoundException('맛집이 존재하지 않습니다.');
        }

        const newListRows = this.restaurantListItemsRepo.create({
            listId: list.id,
            restaurantId: restaurant.id,
        });
        const savedListRows =
            await this.restaurantListItemsRepo.save(newListRows);
        return savedListRows;
    }
}
