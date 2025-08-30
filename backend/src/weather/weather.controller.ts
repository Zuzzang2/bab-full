import { Controller, Get, Query } from '@nestjs/common';
import { WeatherService } from './weather.service';

@Controller('weather')
export class WeatherController {
    constructor(private readonly weatherService: WeatherService) {}

    // http://localhost:3000/weather?lat=37.3781&lon=127.1158 분당 임의 지정

    @Get()
    async getWeather(@Query('lat') lat: string, @Query('lon') lon: string) {
        const result = await this.weatherService.getCurrentWeather(
            parseFloat(lat),
            parseFloat(lon),
        );
        return result;
    }
}
