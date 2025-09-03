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
    async create(userId, createRestaurantDto) {
        const { roadAddress } = createRestaurantDto;
        const existing = await this.restaurantRepository.findOne({
            where: {
                roadAddress,
                user: { id: userId },
            },
        });
        if (existing) {
            throw new common_1.ConflictException('이미 등록된 맛집입니다.');
        }
        const restaurant = this.restaurantRepository.create({
            ...createRestaurantDto,
            user: { id: userId },
        });
        return await this.restaurantRepository.save(restaurant);
    }
    async search(title, page) {
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
    async findMyRestaurants(userId, title, page = 1, sort = 'latest') {
        const take = 5;
        const skip = (page - 1) * take;
        const where = {};
        if (title) {
            where.title = (0, typeorm_1.ILike)(`%${title}%`);
        }
        if (userId) {
            where.userId = Number(userId);
        }
        let order;
        switch (sort) {
            case 'oldest':
                order = { createdAt: 'ASC' };
                break;
            case 'title':
                order = { title: 'ASC' };
                break;
            default:
                order = { createdAt: 'DESC' };
                break;
        }
        const [restaurants, total] = await this.restaurantRepository.findAndCount({
            where,
            take,
            skip,
            order,
        });
        return {
            total,
            page,
            pageSize: take,
            data: restaurants,
        };
    }
    async delete(userId, restaurantId) {
        const restaurant = await this.restaurantRepository.findOne({
            where: {
                id: restaurantId,
                user: { id: userId },
            },
        });
        if (!restaurant) {
            throw new common_1.NotFoundException('맛집을 찾을 수 없거나 권한이 없습니다.');
        }
        await this.restaurantRepository.remove(restaurant);
        return { message: '맛집이 삭제되었습니다.' };
    }
};
exports.RestaurantService = RestaurantService;
exports.RestaurantService = RestaurantService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [restaurant_repository_1.RestaurantRepository,
        config_1.ConfigService])
], RestaurantService);
//# sourceMappingURL=restaurant.service.js.map