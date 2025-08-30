import { RestaurantService } from './restaurant.service';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { DeleteRestaurantDto } from './dto/delete-restaurant.dto';
export declare class RestaurantController {
    private readonly restaurantService;
    constructor(restaurantService: RestaurantService);
    search(title: string): Promise<any>;
    find(title?: string, page?: string): Promise<{
        total: number;
        page: number;
        pageSize: number;
        data: import("./restaurant.entity").RestaurantEntity[];
    }>;
    create(location: string): Promise<{
        count: number;
        saved: import("./restaurant.entity").RestaurantEntity[];
        skipped: number;
    }>;
    update(id: number, updateRestaurantDto: UpdateRestaurantDto): Promise<import("typeorm").UpdateResult>;
    delete(deleteRestaurantDto: DeleteRestaurantDto): Promise<import("./restaurant.entity").RestaurantEntity>;
}
