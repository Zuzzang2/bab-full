import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { DeleteRestaurantDto } from './dto/delete-restaurant.dto';

@Controller('restaurants')
export class RestaurantController {
    constructor(private readonly restaurantService: RestaurantService) {}

    @Get()
    findAll() {
        return this.restaurantService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.restaurantService.findOne(id);
    }

    @Post('/post')
    create(@Body() createRestaurantDto: CreateRestaurantDto) {
        return this.restaurantService.create(createRestaurantDto);
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
