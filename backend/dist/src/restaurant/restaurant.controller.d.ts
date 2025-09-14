import { RestaurantService } from './service/restaurant.service';
import { RestaurantListsService } from './service/restaurant-lists.service';
import { RestaurantListItemsService } from './service/restaurant-list-items.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { CreateRestaurantListsDto } from './dto/create-restaurant-lists.dto';
import { CreateRestaurantListItemsDto } from './dto/create-restaurant-list-items.dto';
export declare class RestaurantController {
    private readonly restaurantService;
    private readonly restaurantListsService;
    private readonly restaurantListItemsService;
    constructor(restaurantService: RestaurantService, restaurantListsService: RestaurantListsService, restaurantListItemsService: RestaurantListItemsService);
    searchAllRestaurants(title: string, page?: string): Promise<any>;
    findSavedByUserId(req: any): Promise<import("./entity/restaurant.entity").RestaurantEntity[]>;
    addRestaurantToList(req: any, listId: number, dto: CreateRestaurantListItemsDto): Promise<import("./entity/restaurant-list-items").RestaurantListItemsEntity>;
    findAllMyLists(req: any): Promise<{
        data: import("./entity/restaurant-lists.entity").RestaurantListsEntity[];
        message: string;
        statusCode: number;
    }>;
    createList(req: any, dto: CreateRestaurantListsDto): Promise<{
        data: import("./entity/restaurant-lists.entity").RestaurantListsEntity;
        message: string;
        statusCode: number;
    }>;
    findDetailByIdAndUserId(id: number, req: any): Promise<import("./entity/restaurant.entity").RestaurantEntity>;
    removeMyRestaurant(req: any, id: number): Promise<{
        message: string;
    }>;
    findMyRestaurantListItems(req: any, listId: string, title?: string, page?: string, sort?: string): Promise<{
        total: number;
        page: number;
        pageSize: number;
        data: import("./entity/restaurant.entity").RestaurantEntity[];
    }>;
    createMyRestaurant(req: any, createRestaurantDto: CreateRestaurantDto): Promise<import("./entity/restaurant.entity").RestaurantEntity>;
}
