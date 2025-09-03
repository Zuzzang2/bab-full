import { RestaurantRepository } from './restaurant.repository';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { ConfigService } from '@nestjs/config';
export declare class RestaurantService {
    private readonly restaurantRepository;
    private config;
    constructor(restaurantRepository: RestaurantRepository, config: ConfigService);
    create(userId: number, createRestaurantDto: CreateRestaurantDto): Promise<import("./restaurant.entity").RestaurantEntity>;
    search(title: string, page: number): Promise<any>;
    findMyRestaurants(userId?: string, title?: string, page?: number, sort?: string): Promise<{
        total: number;
        page: number;
        pageSize: number;
        data: import("./restaurant.entity").RestaurantEntity[];
    }>;
    delete(userId: number, restaurantId: number): Promise<{
        message: string;
    }>;
}
