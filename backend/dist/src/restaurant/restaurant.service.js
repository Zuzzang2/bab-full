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
exports.RestaurantService = void 0;
const common_1 = require("@nestjs/common");
const restaurant_repository_1 = require("./restaurant.repository");
const config_1 = require("@nestjs/config");
const axios_1 = __importDefault(require("axios"));
const typeorm_1 = require("typeorm");
let RestaurantService = class RestaurantService {
    restaurantRepository;
    config;
    constructor(restaurantRepository, config) {
        this.restaurantRepository = restaurantRepository;
        this.config = config;
    }
    async create(location) {
        const naverClientId = this.config.get('X_NAVER_CLIENT_ID');
        const naverClientSecret = this.config.get('X_NAVER_CLIENT_SECRET');
        const url = `https://openapi.naver.com/v1/search/local.json`;
        const params = {
            query: `${location}`,
            display: 5,
            start: 1,
            sort: 'random',
        };
        const headers = {
            'X-Naver-Client-Id': naverClientId,
            'X-Naver-Client-Secret': naverClientSecret,
        };
        try {
            const { data } = await axios_1.default.get(url, { params, headers });
            const rawItems = data.items.map((item) => ({
                title: item.title.replace(/<[^>]+>/g, ''),
                link: item.link,
                category: item.category,
                description: item.description,
                telephone: item.telephone,
                address: item.address,
                roadAddress: item.roadAddress,
                mapx: Number(item.mapx),
                mapy: Number(item.mapy),
            }));
            const existing = await this.restaurantRepository.find({
                where: rawItems.map((item) => ({
                    roadAddress: item.roadAddress,
                })),
            });
            const existingRoadAddresses = new Set(existing.map((e) => e.roadAddress));
            const newItems = rawItems.filter((item) => !existingRoadAddresses.has(item.roadAddress));
            const newEntities = this.restaurantRepository.create(newItems);
            await this.restaurantRepository.save(newEntities);
            return {
                count: newEntities.length,
                saved: newEntities,
                skipped: rawItems.length - newEntities.length,
            };
        }
        catch (error) {
            console.error('네이버 API 호출 실패:', error.message);
            throw new Error('네이버 로컬 검색 실패');
        }
    }
    async search(title) {
        const naverClientId = this.config.get('X_NAVER_CLIENT_ID');
        const naverClientSecret = this.config.get('X_NAVER_CLIENT_SECRET');
        const url = `https://openapi.naver.com/v1/search/local.json`;
        const params = {
            query: `${title}`,
            display: 5,
            start: 1,
            sort: 'random',
        };
        const headers = {
            'X-Naver-Client-Id': naverClientId,
            'X-Naver-Client-Secret': naverClientSecret,
        };
        try {
            const { data } = await axios_1.default.get(url, { params, headers });
            return data;
        }
        catch (error) {
            console.error('네이버 API 호출 실패:', error.message);
            throw new Error('네이버 로컬 검색 실패');
        }
    }
    async find(title, page = 1) {
        const take = 5;
        const skip = (page - 1) * take;
        const where = title ? { title: (0, typeorm_1.ILike)(`%${title}%`) } : {};
        const [restaurants, total] = await this.restaurantRepository.findAndCount({
            where,
            take,
            skip,
            order: { id: 'ASC' },
        });
        return {
            total,
            page,
            pageSize: take,
            data: restaurants,
        };
    }
    findOne(id) {
        return this.restaurantRepository.findOneByIdOrFail(id);
    }
    update(id, updateRestaurantDto) {
        return this.restaurantRepository.update(id, updateRestaurantDto);
    }
    delete(deleteRestaurantDto) {
        return this.restaurantRepository.deleteByIdOrFail(deleteRestaurantDto.id);
    }
};
exports.RestaurantService = RestaurantService;
exports.RestaurantService = RestaurantService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [restaurant_repository_1.RestaurantRepository,
        config_1.ConfigService])
], RestaurantService);
//# sourceMappingURL=restaurant.service.js.map