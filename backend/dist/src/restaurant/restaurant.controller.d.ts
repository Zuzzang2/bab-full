import { RestaurantService } from './restaurant.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { DeleteRestaurantDto } from './dto/delete-restaurant.dto';
export declare class RestaurantController {
    private readonly restaurantService;
    constructor(restaurantService: RestaurantService);
    findAll(): Promise<import("./restaurant.entity").RestaurantEntity[]>;
    findOne(id: number): Promise<import("./restaurant.entity").RestaurantEntity>;
    create(createRestaurantDto: CreateRestaurantDto): Promise<import("./restaurant.entity").RestaurantEntity>;
    update(id: number, updateRestaurantDto: UpdateRestaurantDto): Promise<import("typeorm").UpdateResult>;
    delete(deleteRestaurantDto: DeleteRestaurantDto): Promise<import("./restaurant.entity").RestaurantEntity>;
}
