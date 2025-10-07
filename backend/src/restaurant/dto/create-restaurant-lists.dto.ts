import { IsOptional, IsString } from 'class-validator';

export class CreateRestaurantListsDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;
}
