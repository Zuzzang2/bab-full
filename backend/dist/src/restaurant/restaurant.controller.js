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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestaurantController = void 0;
const common_1 = require("@nestjs/common");
const restaurant_service_1 = require("./restaurant.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const create_restaurant_dto_1 = require("./dto/create-restaurant.dto");
let RestaurantController = class RestaurantController {
    restaurantService;
    constructor(restaurantService) {
        this.restaurantService = restaurantService;
    }
    search(title, page = '1') {
        return this.restaurantService.search(title, Number(page));
    }
    findMyRestaurants(req, title, page = '1', sort = 'latest') {
        return this.restaurantService.findMyRestaurants(req.user.userId, title, Number(page), sort);
    }
    create(req, createRestaurantDto) {
        console.log(createRestaurantDto);
        return this.restaurantService.create(req.user.userId, createRestaurantDto);
    }
    delete(req, id) {
        return this.restaurantService.delete(req.user.userId, id);
    }
};
exports.RestaurantController = RestaurantController;
__decorate([
    (0, common_1.Get)('/search'),
    __param(0, (0, common_1.Query)('title')),
    __param(1, (0, common_1.Query)('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], RestaurantController.prototype, "search", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('title')),
    __param(2, (0, common_1.Query)('page')),
    __param(3, (0, common_1.Query)('sort')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String]),
    __metadata("design:returntype", void 0)
], RestaurantController.prototype, "findMyRestaurants", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_restaurant_dto_1.CreateRestaurantDto]),
    __metadata("design:returntype", void 0)
], RestaurantController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)('/delete/:id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], RestaurantController.prototype, "delete", null);
exports.RestaurantController = RestaurantController = __decorate([
    (0, common_1.Controller)('restaurants'),
    __metadata("design:paramtypes", [restaurant_service_1.RestaurantService])
], RestaurantController);
//# sourceMappingURL=restaurant.controller.js.map