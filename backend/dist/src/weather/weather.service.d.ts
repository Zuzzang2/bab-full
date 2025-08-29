import { ConfigService } from '@nestjs/config';
export declare class WeatherService {
    private config;
    constructor(config: ConfigService);
    getCurrentWeather(lat: number, lon: number): Promise<any>;
}
