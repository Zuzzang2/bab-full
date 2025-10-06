import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { DataSource } from 'typeorm';
import { RestaurantListsEntity } from '../entity/restaurant-lists.entity';

@Injectable()
export class RestaurantListsRepository extends Repository<RestaurantListsEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(RestaurantListsEntity, dataSource.createEntityManager());
  }
}
