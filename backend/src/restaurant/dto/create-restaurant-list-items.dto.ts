import { IsNumber } from 'class-validator';
import { Column } from 'typeorm';

export class CreateRestaurantListItemsDto {
    @IsNumber()
    listId: number;

    @IsNumber()
    restaurantId: number;
}
