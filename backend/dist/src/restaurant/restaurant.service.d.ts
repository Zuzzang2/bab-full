import { RestaurantRepository } from './restaurant.repository';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { DeleteRestaurantDto } from './dto/delete-restaurant.dto';
import { ConfigService } from '@nestjs/config';
export declare class RestaurantService {
    private readonly restaurantRepository;
    private config;
    constructor(restaurantRepository: RestaurantRepository, config: ConfigService);
    create(userId: number, createRestaurantDto: CreateRestaurantDto): Promise<import("./restaurant.entity").RestaurantEntity>;
    search(title: string): Promise<any>;
    find(userId?: string, title?: string, page?: number, sort?: string): Promise<{
        total: number;
        page: number;
        pageSize: number;
        data: import("./restaurant.entity").RestaurantEntity[];
    }>;
    findOne(id: number): Promise<import("./restaurant.entity").RestaurantEntity>;
    update(id: number, updateRestaurantDto: Partial<CreateRestaurantDto>): Promise<import("typeorm").UpdateResult>;
    delete(deleteRestaurantDto: DeleteRestaurantDto): Promise<import("./restaurant.entity").RestaurantEntity>;
}
