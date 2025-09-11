import { RestaurantRepository } from './repository/restaurant.repository';
import { RestaurantListsRepository } from './repository/restaurant-lists.repository';
import { RestaurantListItemsRepository } from './repository/restaurant-list-items.repository';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { ConfigService } from '@nestjs/config';
export declare class RestaurantService {
    private readonly restaurantRepository;
    private readonly restaurantListsRepository;
    private readonly restaurantListItemsRepository;
    private config;
    constructor(restaurantRepository: RestaurantRepository, restaurantListsRepository: RestaurantListsRepository, restaurantListItemsRepository: RestaurantListItemsRepository, config: ConfigService);
    createMyRestaurant(userId: number, createRestaurantDto: CreateRestaurantDto): Promise<import("./entity/restaurant.entity").RestaurantEntity>;
    searchAllRestaurants(title: string, page?: number): Promise<any>;
    findMyRestaurantList(userId?: string, title?: string, page?: number, sort?: string): Promise<{
        total: number;
        page: number;
        pageSize: number;
        data: import("./entity/restaurant.entity").RestaurantEntity[];
    }>;
    findSavedByUserId(userId: number): Promise<import("./entity/restaurant.entity").RestaurantEntity[]>;
    findDetailByIdAndUserId(id: number, userId: number): Promise<import("./entity/restaurant.entity").RestaurantEntity>;
    removeMyRestaurant(userId: number, restaurantId: number): Promise<{
        message: string;
    }>;
}
