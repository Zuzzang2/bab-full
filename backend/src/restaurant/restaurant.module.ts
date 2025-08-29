import { Module } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { RestaurantController } from './restaurant.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantEntity } from './restaurant.entity';
import { RestaurantRepository } from './restaurant.repository';

@Module({
    imports: [TypeOrmModule.forFeature([RestaurantEntity])],
    controllers: [RestaurantController],
    providers: [RestaurantService, RestaurantRepository],
})
export class RestaurantModule {}
