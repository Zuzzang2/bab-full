import { Module } from '@nestjs/common';
import { RestaurantService } from './service/restaurant.service';
import { RestaurantController } from './restaurant.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantEntity } from './entity/restaurant.entity';
import { RestaurantRepository } from './repository/restaurant.repository';
import { RestaurantListsEntity } from './entity/restaurant-lists.entity';
import { RestaurantListItemsEntity } from './entity/restaurant-list-items';
import { RestaurantListsService } from './service/restaurant-lists.service';
import { RestaurantListItemsService } from './service/restaurant-list-items.service';
import { RestaurantListsRepository } from './repository/restaurant-lists.repository';
import { RestaurantListItemsRepository } from './repository/restaurant-list-items.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            RestaurantEntity,
            RestaurantListsEntity,
            RestaurantListItemsEntity,
        ]),
    ],
    controllers: [RestaurantController],
    providers: [
        RestaurantService,
        RestaurantListsService,
        RestaurantListItemsService,
        RestaurantRepository,
        RestaurantListsRepository,
        RestaurantListItemsRepository,
    ],
})
export class RestaurantModule {}
