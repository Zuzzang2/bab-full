import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class DeleteRestaurantDto {
    @Type(() => Number)
    @IsInt()
    id: number;
}
