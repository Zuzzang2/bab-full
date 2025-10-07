import { IsNumber } from 'class-validator';

export class CreateRestaurantListItemsDto {
  @IsNumber()
  restaurantId: number;
}
