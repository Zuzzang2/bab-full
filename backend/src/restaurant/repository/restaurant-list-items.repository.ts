import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { DataSource } from 'typeorm';
import { RestaurantListItemsEntity } from '../entity/restaurant-list-items';

@Injectable()
export class RestaurantListItemsRepository extends Repository<RestaurantListItemsEntity> {
    constructor(private readonly dataSource: DataSource) {
        super(RestaurantListItemsEntity, dataSource.createEntityManager());
    }
}
