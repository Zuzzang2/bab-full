import { IsNumber } from 'class-validator';
import { Column } from 'typeorm';

export class CreateRestaurantListItemsDto {
  @IsNumber()
  restaurantId: number;
}
