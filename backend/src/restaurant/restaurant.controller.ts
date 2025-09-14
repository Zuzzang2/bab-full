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

    // 네이버 API로 모든 맛집 검색
    @Get('/search')
    searchAllRestaurants(
        @Query('title') title: string,
        @Query('page') page: string = '1',
    ) {
        return this.restaurantService.searchAllRestaurants(title, Number(page));
    }

    // 맛집 검색 중복 확인
    @UseGuards(JwtAuthGuard)
    @Get('/check-duplicate')
    findSavedByUserId(@Req() req) {
        return this.restaurantService.findSavedByUserId(req.user.userId);
    }

    // 나의 리스트에 맛집 추가
    @Post('/list/:listId')
    @UseGuards(JwtAuthGuard)
    async addRestaurantToList(
        @Req() req,
        @Param('listId') listId: number,
        @Body() dto: CreateRestaurantListItemsDto,
    ) {
        return this.restaurantListItemsService.createListItem(
            { ...dto },
            req.user.userId,
            listId,
        );
    }

    // 나의 리스트 전체 목록
    @Get('/list')
    @UseGuards(JwtAuthGuard)
    async findAllMyLists(@Req() req) {
        const userId = req.user.userId;
        return this.restaurantListsService.findAllListsByUser(userId);
    }

    // 나의 리스트 생성
    @Post('/list')
    @UseGuards(JwtAuthGuard)
    async createList(@Req() req, @Body() dto: CreateRestaurantListsDto) {
        const userId = req.user.userId;
        return this.restaurantListsService.createList(dto, userId);
    }

    // 나의 맛집 상세페이지
    @UseGuards(JwtAuthGuard)
    @Get('/:restaurantId')
    findDetailByIdAndUserId(
        @Param('restaurantId', ParseIntPipe) id: number,
        @Req() req,
    ) {
        return this.restaurantService.findDetailByIdAndUserId(
            id,
            req.user.userId,
        );
    }

    // 저장된 맛집 삭제
    @UseGuards(JwtAuthGuard)
    @Delete('/:restaurantId')
    removeMyRestaurant(
        @Req() req,
        @Param('restaurantId', ParseIntPipe) id: number,
    ) {
        return this.restaurantService.removeMyRestaurant(req.user.userId, id);
    }

    // 해당 리스트의 맛집 목록
    @UseGuards(JwtAuthGuard)
    @Get()
    findMyRestaurantListItems(
        @Req() req,
        @Query('listId') listId: string,
        @Query('title') title?: string,
        @Query('page') page: string = '1',
        @Query('sort') sort: string = 'latest',
    ) {
        return this.restaurantService.findMyRestaurantListItems(
            req.user.userId,
            Number(listId),
            title,
            Number(page),
            sort,
        );
    }

    // 리스트에 맛집 등록
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
}
