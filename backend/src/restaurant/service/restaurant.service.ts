import {
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { RestaurantRepository } from '../repository/restaurant.repository';
import { RestaurantListsRepository } from '../repository/restaurant-lists.repository';
import { CreateRestaurantDto } from '../dto/create-restaurant.dto';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { ILike } from 'typeorm';

@Injectable()
export class RestaurantService {
    constructor(
        private readonly restaurantRepository: RestaurantRepository,
        private readonly restaurantListsRepository: RestaurantListsRepository,
        private config: ConfigService,
    ) {}

    async createMyRestaurant(
        userId: number,
        createRestaurantDto: CreateRestaurantDto,
    ) {
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

    async searchAllRestaurants(title: string, page: number = 1) {
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

    async findMyRestaurantListItems(
        userId: string,
        listId: number,
        title?: string,
        page: number = 1,
        sort: string = 'latest',
    ) {
        const take = 5;
        const skip = (page - 1) * take;

        const list = await this.restaurantListsRepository.findOne({
            where: { id: listId, userId: Number(userId) },
        });
        if (!list) {
            throw new NotFoundException('리스트가 존재하지 않습니다.');
        }

        // 정렬 조건
        let orderByColumn: string;
        let orderDirection: 'ASC' | 'DESC';
        switch (sort) {
            case 'oldest':
                orderByColumn = 'restaurant.createdAt';
                orderDirection = 'ASC';
                break;
            case 'title':
                orderByColumn = 'restaurant.title';
                orderDirection = 'ASC';
                break;
            default:
                orderByColumn = 'restaurant.createdAt';
                orderDirection = 'DESC';
                break;
        }

        // 쿼리빌더로 조인 (ListItem 통해 userId 필터링)
        const qb = this.restaurantRepository
            .createQueryBuilder('restaurant')
            .leftJoin('restaurant.items', 'listItem')
            .innerJoin(
                'listItem.list',
                'list',
                'list.id = :listId AND list.userId = :userId',
                {
                    listId: Number(listId),
                    userId: Number(userId),
                },
            );

        if (title) {
            qb.andWhere('restaurant.title ILIKE :title', {
                title: `%${title}%`,
            });
            console.log(title);
        }

        qb.orderBy(orderByColumn, orderDirection).take(take).skip(skip);

        const [restaurants, total] = await qb.getManyAndCount();
        console.log(restaurants);

        return {
            total, // 전체 맛집 개수
            page, // 현재 페이지
            pageSize: take,
            data: restaurants, // 5개 단위 맛집 데이터
        };
    }

    async findSavedByUserId(userId: number) {
        return this.restaurantRepository.find({
            where: { userId },
        });
    }

    async findDetailByIdAndUserId(id: number, userId: number) {
        const restaurant = await this.restaurantRepository.findOne({
            where: { id, user: { id: userId } },
        });

        if (!restaurant) {
            throw new NotFoundException('맛집을 찾을 수 없습니다.');
        }

        return restaurant;
    }

    async removeMyRestaurant(userId: number, restaurantId: number) {
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
