import { IsArray, IsOptional, IsString } from 'class-validator';

export class CreateRestaurantDto {
    @IsString()
    name: string;

    @IsString()
    category: string;

    @IsString()
    address: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsOptional()
    phone?: string;

    @IsString()
    @IsOptional()
    @IsArray()
    menu?: string[];
}
