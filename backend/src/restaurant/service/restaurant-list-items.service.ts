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

    async createListItem(
        dto: CreateRestaurantListItemsDto,
        userId: number,
        listId: number,
    ) {
        console.log('userid :', userId);
        console.log('dto :', dto);
        console.log('listId :', listId);
        const list = await this.restaurantListsRepo.findOne({
            where: { userId: Number(userId), id: Number(listId) },
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

        const newListItem = this.restaurantListItemsRepo.create({
            listId: list.id,
            restaurantId: restaurant.id,
        });
        const savedListItem =
            await this.restaurantListItemsRepo.save(newListItem);
        return savedListItem;
    }
}
