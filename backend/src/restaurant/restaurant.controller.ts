import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
    Req,
    UseGuards,
} from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { DeleteRestaurantDto } from './dto/delete-restaurant.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';

@Controller('restaurants')
export class RestaurantController {
    constructor(private readonly restaurantService: RestaurantService) {}

    @Get('/search')
    search(@Query('title') title: string) {
        return this.restaurantService.search(title);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    find(
        @Req() req,
        @Query('title') title?: string,
        @Query('page') page: string = '1',
        @Query('sort') sort: string = 'latest',
    ) {
        return this.restaurantService.find(
            req.user.userId,
            title,
            Number(page),
            sort,
        );
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Req() req, @Body() createRestaurantDto: CreateRestaurantDto) {
        console.log(createRestaurantDto);
        return this.restaurantService.create(
            req.user.userId,
            createRestaurantDto,
        );
    }

    @Patch('/edit/:id')
    update(
        @Param('id') id: number,
        @Body() updateRestaurantDto: UpdateRestaurantDto,
    ) {
        return this.restaurantService.update(id, updateRestaurantDto);
    }

    @Delete('/delete/:id')
    delete(@Body() deleteRestaurantDto: DeleteRestaurantDto) {
        return this.restaurantService.delete(deleteRestaurantDto);
    }
}
