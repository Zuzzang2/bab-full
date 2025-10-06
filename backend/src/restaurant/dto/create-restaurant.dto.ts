import { IsOptional, IsString, IsNumber } from 'class-validator';

export class CreateRestaurantDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  link?: string;

  @IsString()
  @IsOptional()
  category?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  telephone?: string;

  @IsString()
  address: string;

  @IsString()
  roadAddress: string;

  @IsNumber()
  mapx: number;

  @IsNumber()
  mapy: number;
}
