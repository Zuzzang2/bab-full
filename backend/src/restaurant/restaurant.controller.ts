import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Query,
    Req,
    UseGuards,
} from '@nestjs/common';
import { RestaurantService } from './service/restaurant.service';
import { RestaurantListsService } from './service/restaurant-lists.service';
import { RestaurantListItemsService } from './service/restaurant-list-items.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { CreateRestaurantListsDto } from './dto/create-restaurant-lists.dto';
import { CreateRestaurantListItemsDto } from './dto/create-restaurant-list-items.dto';

@Controller('restaurants')
export class RestaurantController {
    constructor(
        private readonly restaurantService: RestaurantService,
        private readonly restaurantListsService: RestaurantListsService,
        private readonly restaurantListItemsService: RestaurantListItemsService,
    ) {}

    // 모든 맛집 검색
    @Get('/search')
    searchAllRestaurants(
        @Query('title') title: string,
        @Query('page') page: string = '1',
    ) {
        return this.restaurantService.searchAllRestaurants(title, Number(page));
    }

    // 나의 맛집 목록 조회 - 수정 필요
    @UseGuards(JwtAuthGuard)
    @Get('/my-list')
    findMyRestaurantList(
        @Req() req,
        @Query('title') title?: string,
        @Query('page') page: string = '1',
        @Query('sort') sort: string = 'latest',
    ) {
        return this.restaurantService.findMyRestaurantList(
            req.user.userId,
            title,
            Number(page),
            sort,
        );
    }

    // 맛집 검색 중복 확인
    @UseGuards(JwtAuthGuard)
    @Get('/check-saved')
    findSavedByUserId(@Req() req) {
        return this.restaurantService.findSavedByUserId(req.user.userId);
    }

    // 나의 맛집 상세페이지
    @UseGuards(JwtAuthGuard)
    @Get('/detail/:id')
    findDetailByIdAndUserId(@Param('id', ParseIntPipe) id: number, @Req() req) {
        return this.restaurantService.findDetailByIdAndUserId(
            id,
            req.user.userId,
        );
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    createMyRestaurant(
        @Req() req,
        @Body() createRestaurantDto: CreateRestaurantDto,
    ) {
        return this.restaurantService.createMyRestaurant(
            req.user.userId,
            createRestaurantDto,
        );
    }

    // 나의 맛집 삭제
    @UseGuards(JwtAuthGuard)
    @Delete('/delete/:id')
    removeMyRestaurant(@Req() req, @Param('id', ParseIntPipe) id: number) {
        return this.restaurantService.removeMyRestaurant(req.user.userId, id);
    }

    // 나의 리스트 전체 목록
    @Get('/lists/all')
    async findAllMyLists(@Req() req) {
        const userId = req.user.userId;
        return this.restaurantListsService.findAllListsByUser(userId);
    }

    @Get('/lists/my')
    async findMyList(@Req() req) {
        const userId = req.user.userId;
        return this.restaurantListsService.findMyListByUser(userId);
    }

    // 나의 리스트 생성
    @Post()
    async createList(@Req() req, @Body() dto: CreateRestaurantListsDto) {
        const userId = req.user.userId;
        return this.restaurantListsService.createList(dto, userId);
    }

    // 중간 테이블
    @Post('/lists/items')
    async createListRows(
        @Req() req,
        @Body() dto: CreateRestaurantListItemsDto,
    ) {
        const userId = req.user.userId;
        return this.restaurantListItemsService.createListRows(dto, userId);
    }
}
