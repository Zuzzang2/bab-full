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

    @Get('/search')
    search(@Query('title') title: string, @Query('page') page: string = '1') {
        return this.restaurantService.search(title, Number(page));
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    findMyRestaurants(
        @Req() req,
        @Query('title') title?: string,
        @Query('page') page: string = '1',
        @Query('sort') sort: string = 'latest',
    ) {
        return this.restaurantService.findMyRestaurants(
            req.user.userId,
            title,
            Number(page),
            sort,
        );
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    RestaurantDetail(@Param('id', ParseIntPipe) id: number, @Req() req) {
        return this.restaurantService.RestaurantDetailById(id, req.user.userId);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Req() req, @Body() createRestaurantDto: CreateRestaurantDto) {
        return this.restaurantService.create(
            req.user.userId,
            createRestaurantDto,
        );
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/delete/:id')
    delete(@Req() req, @Param('id', ParseIntPipe) id: number) {
        return this.restaurantService.delete(req.user.userId, id);
    }
}
