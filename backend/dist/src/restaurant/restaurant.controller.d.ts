import { RestaurantService } from './restaurant.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
export declare class RestaurantController {
    private readonly restaurantService;
    constructor(restaurantService: RestaurantService);
    search(title: string, page?: string): Promise<any>;
    findMyRestaurants(req: any, title?: string, page?: string, sort?: string): Promise<{
        total: number;
        page: number;
        pageSize: number;
        data: import("./restaurant.entity").RestaurantEntity[];
    }>;
    RestaurantDetail(id: number, req: any): Promise<import("./restaurant.entity").RestaurantEntity>;
    create(req: any, createRestaurantDto: CreateRestaurantDto): Promise<import("./restaurant.entity").RestaurantEntity>;
    delete(req: any, id: number): Promise<{
        message: string;
    }>;
}
