"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestaurantService = void 0;
const common_1 = require("@nestjs/common");
const restaurant_repository_1 = require("./restaurant.repository");
let RestaurantService = class RestaurantService {
    restaurantRepository;
    constructor(restaurantRepository) {
        this.restaurantRepository = restaurantRepository;
    }
    create(createRestaurantDto) {
        return this.restaurantRepository.createAndSave(createRestaurantDto);
    }
    findAll() {
        return this.restaurantRepository.findAll();
    }
    findOne(id) {
        return this.restaurantRepository.findOneByIdOrFail(id);
    }
    update(id, updateRestaurantDto) {
        return this.restaurantRepository.update(id, updateRestaurantDto);
    }
    delete(deleteRestaurantDto) {
        return this.restaurantRepository.deleteByIdOrFail(deleteRestaurantDto.id);
    }
};
exports.RestaurantService = RestaurantService;
exports.RestaurantService = RestaurantService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [restaurant_repository_1.RestaurantRepository])
], RestaurantService);
//# sourceMappingURL=restaurant.service.js.map