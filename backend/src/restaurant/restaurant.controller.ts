import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
} from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { DeleteRestaurantDto } from './dto/delete-restaurant.dto';

@Controller('restaurants')
export class RestaurantController {
    constructor(private readonly restaurantService: RestaurantService) {}

    @Get('/search')
    search(@Query('title') title: string) {
        return this.restaurantService.search(title);
    }

    @Get()
    find(@Query('title') title?: string, @Query('page') page: string = '1') {
        return this.restaurantService.find(title, Number(page));
    }

    @Post()
    create(@Query('location') location: string) {
        return this.restaurantService.create(location);
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
