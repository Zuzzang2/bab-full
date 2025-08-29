"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeatherService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const axios_1 = __importDefault(require("axios"));
const weather_base_time_1 = require("../../lib/weather/weather-base-time");
const convert_latlon_to_xy_1 = require("../../lib/weather/convert-latlon-to-xy");
let WeatherService = class WeatherService {
    config;
    constructor(config) {
        this.config = config;
    }
    async getCurrentWeather(lat, lon) {
        const serviceKey = this.config.get('WEATHER_API_KEY');
        const { nx, ny } = (0, convert_latlon_to_xy_1.dfs_xy_conv)(lat, lon);
        const { baseDate, baseTime } = (0, weather_base_time_1.getBaseDateTime)();
        const url = `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst`;
        const params = {
            serviceKey: serviceKey,
            pageNo: '1',
            numOfRows: '10',
            dataType: 'JSON',
            base_date: baseDate,
            base_time: baseTime,
            nx,
            ny,
        };
        console.log(params);
        try {
            const { data } = await axios_1.default.get(url, { params });
            console.log(data);
            return data.response.body.items.item;
        }
        catch (error) {
            console.error('[WeatherService] 날씨 API 요청 실패:', error.message);
            throw new Error('날씨 API 요청 실패');
        }
    }
};
exports.WeatherService = WeatherService;
exports.WeatherService = WeatherService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], WeatherService);
//# sourceMappingURL=weather.service.js.map