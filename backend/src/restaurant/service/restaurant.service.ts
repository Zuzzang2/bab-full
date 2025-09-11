import {
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { RestaurantRepository } from '../repository/restaurant.repository';
import { CreateRestaurantDto } from '../dto/create-restaurant.dto';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { ILike } from 'typeorm';

@Injectable()
export class RestaurantService {
    constructor(
        private readonly restaurantRepository: RestaurantRepository,
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

    async findMyRestaurantList(
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

    async findMyRestaurantListItem(
        userId: string,
        title?: string,
        page: number = 1,
        sort: string = 'latest',
    ) {
        const take = 5;
        const skip = (page - 1) * take;

        // 정렬 조건
        let order: any;
        switch (sort) {
            case 'oldest':
                order = { createdAt: 'ASC' };
                break;
            case 'title':
                order = { name: 'ASC' }; // 레스토랑 이름 기준 정렬
                break;
            default:
                order = { createdAt: 'DESC' };
                break;
        }

        // 쿼리빌더로 조인 (ListItem 통해 userId 필터링)
        const qb = this.restaurantRepository
            .createQueryBuilder('restaurant')
            .innerJoin('restaurant.items', 'listItem')
            .innerJoin('listItem.list', 'list', 'list.userId = :userId', {
                userId: Number(userId),
            });

        if (title) {
            qb.andWhere('restaurant.name ILIKE :title', {
                title: `%${title}%`,
            });
        }

        qb.orderBy(order).take(take).skip(skip);

        const [restaurants, total] = await qb.getManyAndCount();

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
