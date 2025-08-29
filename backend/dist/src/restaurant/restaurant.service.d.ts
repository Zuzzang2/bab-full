import { RestaurantRepository } from './restaurant.repository';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { DeleteRestaurantDto } from './dto/delete-restaurant.dto';
export declare class RestaurantService {
    private readonly restaurantRepository;
    constructor(restaurantRepository: RestaurantRepository);
    create(createRestaurantDto: CreateRestaurantDto): Promise<import("./restaurant.entity").RestaurantEntity>;
    findAll(): Promise<import("./restaurant.entity").RestaurantEntity[]>;
    findOne(id: number): Promise<import("./restaurant.entity").RestaurantEntity>;
    update(id: number, updateRestaurantDto: Partial<CreateRestaurantDto>): Promise<import("typeorm").UpdateResult>;
    delete(deleteRestaurantDto: DeleteRestaurantDto): Promise<import("./restaurant.entity").RestaurantEntity>;
}
