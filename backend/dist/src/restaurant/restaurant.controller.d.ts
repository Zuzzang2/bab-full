import { RestaurantService } from './restaurant.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
export declare class RestaurantController {
    private readonly restaurantService;
    constructor(restaurantService: RestaurantService);
    searchAllRestaurants(title: string, page?: string): Promise<any>;
    findMyRestaurantList(req: any, title?: string, page?: string, sort?: string): Promise<{
        total: number;
        page: number;
        pageSize: number;
        data: import("./restaurant.entity").RestaurantEntity[];
    }>;
    findSavedByUserId(req: any): Promise<import("./restaurant.entity").RestaurantEntity[]>;
    findDetailByIdAndUserId(id: number, req: any): Promise<import("./restaurant.entity").RestaurantEntity>;
    createMyRestaurant(req: any, createRestaurantDto: CreateRestaurantDto): Promise<import("./restaurant.entity").RestaurantEntity>;
    removeMyRestaurant(req: any, id: number): Promise<{
        message: string;
    }>;
}
