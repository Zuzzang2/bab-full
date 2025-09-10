import { RestaurantRepository } from './restaurant.repository';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { ConfigService } from '@nestjs/config';
export declare class RestaurantService {
    private readonly restaurantRepository;
    private config;
    constructor(restaurantRepository: RestaurantRepository, config: ConfigService);
    createMyRestaurant(userId: number, createRestaurantDto: CreateRestaurantDto): Promise<import("./restaurant.entity").RestaurantEntity>;
    searchAllRestaurants(title: string, page?: number): Promise<any>;
    findMyRestaurantList(userId?: string, title?: string, page?: number, sort?: string): Promise<{
        total: number;
        page: number;
        pageSize: number;
        data: import("./restaurant.entity").RestaurantEntity[];
    }>;
    findSavedByUserId(userId: number): Promise<import("./restaurant.entity").RestaurantEntity[]>;
    findDetailByIdAndUserId(id: number, userId: number): Promise<import("./restaurant.entity").RestaurantEntity>;
    removeMyRestaurant(userId: number, restaurantId: number): Promise<{
        message: string;
    }>;
}
