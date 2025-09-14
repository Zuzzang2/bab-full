import { IsOptional, IsString } from 'class-validator';
import { Column } from 'typeorm';

export class CreateRestaurantListsDto {
    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    description?: string;
}
