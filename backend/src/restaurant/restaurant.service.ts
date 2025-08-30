import { Injectable, NotFoundException } from '@nestjs/common';
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

    async create(location: string) {
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
            const { data } = await axios.get(url, { params, headers });

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

            // 이미 저장된 도로명 주소 조회
            const existing = await this.restaurantRepository.find({
                where: rawItems.map((item) => ({
                    roadAddress: item.roadAddress,
                })),
            });
            const existingRoadAddresses = new Set(
                existing.map((e) => e.roadAddress),
            );

            // 중복 아닌 것만 필터링
            const newItems = rawItems.filter(
                (item) => !existingRoadAddresses.has(item.roadAddress),
            );

            const newEntities = this.restaurantRepository.create(newItems);
            await this.restaurantRepository.save(newEntities);

            return {
                count: newEntities.length,
                saved: newEntities,
                skipped: rawItems.length - newEntities.length,
            };
        } catch (error) {
            console.error('네이버 API 호출 실패:', error.message);
            throw new Error('네이버 로컬 검색 실패');
        }
    }

    async search(title: string) {
        const naverClientId = this.config.get('X_NAVER_CLIENT_ID');
        const naverClientSecret = this.config.get('X_NAVER_CLIENT_SECRET');

        const url = `https://openapi.naver.com/v1/search/local.json`;

        const params = {
            query: `${title}`, // 예시용 쿼리
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

    async find(title?: string, page: number = 1) {
        const take = 5;
        const skip = (page - 1) * take;

        const where = title ? { title: ILike(`%${title}%`) } : {};

        const [restaurants, total] =
            await this.restaurantRepository.findAndCount({
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

    findOne(id: number) {
        return this.restaurantRepository.findOneByIdOrFail(id);
    }

    update(id: number, updateRestaurantDto: Partial<CreateRestaurantDto>) {
        return this.restaurantRepository.update(id, updateRestaurantDto);
    }

    delete(deleteRestaurantDto: DeleteRestaurantDto) {
        return this.restaurantRepository.deleteByIdOrFail(
            deleteRestaurantDto.id,
        );
    }
}
