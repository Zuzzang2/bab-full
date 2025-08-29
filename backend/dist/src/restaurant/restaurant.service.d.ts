import { RestaurantRepository } from './restaurant.repository';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
export declare class RestaurantService {
    private readonly restaurantRepository;
    constructor(restaurantRepository: RestaurantRepository);
    create(data: CreateRestaurantDto): Promise<import("./restaurant.entity").RestaurantEntity>;
    findAll(): Promise<import("./restaurant.entity").RestaurantEntity[]>;
}
