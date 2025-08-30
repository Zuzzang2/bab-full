import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, FindOneOptions, Repository } from 'typeorm';
import { RestaurantEntity } from './restaurant.entity';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';

@Injectable()
export class RestaurantRepository extends Repository<RestaurantEntity> {
    constructor(private readonly dataSource: DataSource) {
        super(RestaurantEntity, dataSource.createEntityManager());
    }

    async createAndSave(data: CreateRestaurantDto): Promise<RestaurantEntity> {
        const restaurant = this.create(data);
        return this.save(restaurant);
    }

    async findOneByIdOrFail(id: number): Promise<RestaurantEntity> {
        const restaurant = await this.findOne({ where: { id } });
        if (!restaurant) {
            throw new NotFoundException('해당 맛집이 존재하지 않습니다.');
        }
        return restaurant;
    }

    async deleteByIdOrFail(id: number) {
        const restaurant = await this.findOne({ where: { id } });

        if (!restaurant) {
            throw new NotFoundException('해당 맛집이 존재하지 않습니다!');
        }

        return this.remove(restaurant);
    }
}
