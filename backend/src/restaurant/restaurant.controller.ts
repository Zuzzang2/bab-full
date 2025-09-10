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
import { RestaurantService } from './restaurant.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';

@Controller('restaurants')
export class RestaurantController {
    constructor(private readonly restaurantService: RestaurantService) {}

    // 모든 맛집 검색
    @Get('/search')
    searchAllRestaurants(
        @Query('title') title: string,
        @Query('page') page: string = '1',
    ) {
        return this.restaurantService.searchAllRestaurants(title, Number(page));
    }

    // 내 맛집 리스트 조회
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

    // 검색 중복 확인용
    @UseGuards(JwtAuthGuard)
    @Get('/check-saved')
    findSavedByUserId(@Req() req) {
        return this.restaurantService.findSavedByUserId(req.user.userId);
    }

    // 맛집 상세페이지
    @UseGuards(JwtAuthGuard)
    @Get(':id')
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

    @UseGuards(JwtAuthGuard)
    @Delete('/delete/:id')
    removeMyRestaurant(@Req() req, @Param('id', ParseIntPipe) id: number) {
        return this.restaurantService.removeMyRestaurant(req.user.userId, id);
    }
}
