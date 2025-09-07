import {
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { RestaurantRepository } from './restaurant.repository';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { DeleteRestaurantDto } from './dto/delete-restaurant.dto';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { ILike } from 'typeorm';

@Injectable()
export class RestaurantService {
    constructor(
        private readonly restaurantRepository: RestaurantRepository,
        private config: ConfigService,
    ) {}

    // async create(location: string) {
    //     const naverClientId = this.config.get('X_NAVER_CLIENT_ID');
    //     const naverClientSecret = this.config.get('X_NAVER_CLIENT_SECRET');

    //     const url = `https://openapi.naver.com/v1/search/local.json`;

    //     const params = {
    //         query: `${location}`,
    //         display: 5,
    //         start: 1,
    //         sort: 'random',
    //     };

    //     const headers = {
    //         'X-Naver-Client-Id': naverClientId,
    //         'X-Naver-Client-Secret': naverClientSecret,
    //     };

    //     try {
    //         const { data } = await axios.get(url, { params, headers });

    //         const rawItems = data.items.map((item) => ({
    //             title: item.title.replace(/<[^>]+>/g, ''),
    //             link: item.link,
    //             category: item.category,
    //             description: item.description,
    //             telephone: item.telephone,
    //             address: item.address,
    //             roadAddress: item.roadAddress,
    //             mapx: Number(item.mapx),
    //             mapy: Number(item.mapy),
    //         }));

    //         // 이미 저장된 도로명 주소 조회
    //         const existing = await this.restaurantRepository.find({
    //             where: rawItems.map((item) => ({
    //                 roadAddress: item.roadAddress,
    //             })),
    //         });
    //         const existingRoadAddresses = new Set(
    //             existing.map((e) => e.roadAddress),
    //         );

    //         // 중복 아닌 것만 필터링
    //         const newItems = rawItems.filter(
    //             (item) => !existingRoadAddresses.has(item.roadAddress),
    //         );

    //         const newEntities = this.restaurantRepository.create(newItems);
    //         await this.restaurantRepository.save(newEntities);

    //         return {
    //             count: newEntities.length,
    //             saved: newEntities,
    //             skipped: rawItems.length - newEntities.length,
    //         };
    //     } catch (error) {
    //         console.error('네이버 API 호출 실패:', error.message);
    //         throw new Error('네이버 로컬 검색 실패');
    //     }
    // }

    async create(userId: number, createRestaurantDto: CreateRestaurantDto) {
        const { roadAddress } = createRestaurantDto;

        const existing = await this.restaurantRepository.findOne({
            where: {
                roadAddress,
                user: { id: userId },
            },
        });

        if (existing) {
            throw new ConflictException('이미 등록된 맛집입니다.');
        }

        const restaurant = this.restaurantRepository.create({
            ...createRestaurantDto,
            user: { id: userId },
        });

        return await this.restaurantRepository.save(restaurant);
    }

    async search(title: string, page: number = 1) {
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
            const { data } = await axios.get(url, { params, headers });
            return data;
        } catch (error) {
            console.error('네이버 API 호출 실패:', error.message);
            throw new Error('네이버 로컬 검색 실패');
        }
    }

    async findMyRestaurants(
        userId?: string,
        title?: string,
        page: number = 1,
        sort: string = 'latest',
    ) {
        const take = 5;
        const skip = (page - 1) * take;

        const where: any = {};
        if (title) {
            where.title = ILike(`%${title}%`);
        }
        if (userId) {
            where.userId = Number(userId);
        }

        // 정렬 조건 설정
        let order: any;
        switch (sort) {
            case 'oldest':
                order = { createdAt: 'ASC' };
                break;
            case 'title':
                order = { title: 'ASC' };
                break;
            default: // 'latest'
                order = { createdAt: 'DESC' };
                break;
        }

        const [restaurants, total] =
            await this.restaurantRepository.findAndCount({
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

    async RestaurantDetailById(id: number, userId: number) {
        const restaurant = await this.restaurantRepository.findOne({
            where: { id, user: { id: userId } },
        });

        if (!restaurant) {
            throw new NotFoundException('맛집을 찾을 수 없습니다.');
        }

        return restaurant;
    }

    async delete(userId: number, restaurantId: number) {
        const restaurant = await this.restaurantRepository.findOne({
            where: {
                id: restaurantId,
                user: { id: userId },
            },
        });

        if (!restaurant) {
            throw new NotFoundException(
                '맛집을 찾을 수 없거나 권한이 없습니다.',
            );
        }

        await this.restaurantRepository.remove(restaurant);
        return { message: '맛집이 삭제되었습니다.' };
    }
}
