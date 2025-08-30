import { DataSource, Repository } from 'typeorm';
import { RestaurantEntity } from './restaurant.entity';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
export declare class RestaurantRepository extends Repository<RestaurantEntity> {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    createAndSave(data: CreateRestaurantDto): Promise<RestaurantEntity>;
    findOneByIdOrFail(id: number): Promise<RestaurantEntity>;
    deleteByIdOrFail(id: number): Promise<RestaurantEntity>;
}
