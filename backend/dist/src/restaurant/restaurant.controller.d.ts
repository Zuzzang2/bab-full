import { RestaurantService } from './restaurant.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
export declare class RestaurantController {
    private readonly restaurantService;
    constructor(restaurantService: RestaurantService);
    findAll(): Promise<import("./restaurant.entity").RestaurantEntity[]>;
    create(data: CreateRestaurantDto): Promise<import("./restaurant.entity").RestaurantEntity>;
}
