import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { getBaseDateTime } from '../../lib/weather/weather-base-time';
import { dfs_xy_conv } from '../../lib/weather/convert-latlon-to-xy';

// http://localhost:3000/weather?lat=37.3781&lon=127.1158 분당 임의 지정

@Injectable()
export class WeatherService {
    constructor(private config: ConfigService) {}

    async getCurrentWeather(lat: number, lon: number) {
        const serviceKey = this.config.get('WEATHER_API_KEY');

        const { nx, ny } = dfs_xy_conv(lat, lon);

        const { baseDate, baseTime } = getBaseDateTime();

        const url = `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst`;

        const params = {
            serviceKey: serviceKey,
            pageNo: '1',
            numOfRows: '10', // 한 페이지 결과 수
            dataType: 'JSON',
            base_date: baseDate, // 발표 일자
            base_time: baseTime, // 발표 시각
            nx, // X 좌표
            ny, // Y 좌표
        };
        console.log(params);

        try {
            const { data } = await axios.get(url, { params });
            console.log(data);
            return data.response.body.items.item;
        } catch (error) {
            console.error(
                '[WeatherService] 날씨 API 요청 실패:',
                error.message,
            );
            throw new Error('날씨 API 요청 실패');
        }
    }
}
