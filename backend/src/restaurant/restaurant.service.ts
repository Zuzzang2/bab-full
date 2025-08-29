import { Injectable, NotFoundException } from '@nestjs/common';
import { RestaurantRepository } from './restaurant.repository';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { DeleteRestaurantDto } from './dto/delete-restaurant.dto';

@Injectable()
export class RestaurantService {
    constructor(private readonly restaurantRepository: RestaurantRepository) {}

    create(createRestaurantDto: CreateRestaurantDto) {
        return this.restaurantRepository.createAndSave(createRestaurantDto);
    }

    findAll() {
        return this.restaurantRepository.findAll();
    }

    findOne(id: number) {
        return this.restaurantRepository.findOneByIdOrFail(id);
    }

    update(id: number, updateRestaurantDto: Partial<CreateRestaurantDto>) {
        return this.restaurantRepository.update(id, updateRestaurantDto);
    }

    delete(deleteRestaurantDto: DeleteRestaurantDto) {
        return this.restaurantRepository.deleteByIdOrFail(
            deleteRestaurantDto.id,
        );
    }
}
