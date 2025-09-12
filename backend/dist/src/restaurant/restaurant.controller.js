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
const restaurant_service_1 = require("./service/restaurant.service");
const restaurant_lists_service_1 = require("./service/restaurant-lists.service");
const restaurant_list_items_service_1 = require("./service/restaurant-list-items.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const create_restaurant_dto_1 = require("./dto/create-restaurant.dto");
const create_restaurant_lists_dto_1 = require("./dto/create-restaurant-lists.dto");
const create_restaurant_list_items_dto_1 = require("./dto/create-restaurant-list-items.dto");
let RestaurantController = class RestaurantController {
    restaurantService;
    restaurantListsService;
    restaurantListItemsService;
    constructor(restaurantService, restaurantListsService, restaurantListItemsService) {
        this.restaurantService = restaurantService;
        this.restaurantListsService = restaurantListsService;
        this.restaurantListItemsService = restaurantListItemsService;
    }
    searchAllRestaurants(title, page = '1') {
        return this.restaurantService.searchAllRestaurants(title, Number(page));
    }
    findSavedByUserId(req) {
        return this.restaurantService.findSavedByUserId(req.user.userId);
    }
    async addRestaurantToList(req, listId, dto) {
        return this.restaurantListItemsService.createListItem({ ...dto }, req.user.userId, listId);
    }
    async findAllMyLists(req) {
        const userId = req.user.userId;
        return this.restaurantListsService.findAllListsByUser(userId);
    }
    async createList(req, dto) {
        const userId = req.user.userId;
        return this.restaurantListsService.createList(dto, userId);
    }
    findDetailByIdAndUserId(id, req) {
        return this.restaurantService.findDetailByIdAndUserId(id, req.user.userId);
    }
    removeMyRestaurant(req, id) {
        return this.restaurantService.removeMyRestaurant(req.user.userId, id);
    }
    findMyRestaurantListItems(req, title, page = '1', sort = 'latest') {
        return this.restaurantService.findMyRestaurantListItems(req.user.userId, title, Number(page), sort);
    }
    createMyRestaurant(req, createRestaurantDto) {
        return this.restaurantService.createMyRestaurant(req.user.userId, createRestaurantDto);
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
], RestaurantController.prototype, "searchAllRestaurants", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('/check-duplicate'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], RestaurantController.prototype, "findSavedByUserId", null);
__decorate([
    (0, common_1.Post)('/list/:listId'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('listId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, create_restaurant_list_items_dto_1.CreateRestaurantListItemsDto]),
    __metadata("design:returntype", Promise)
], RestaurantController.prototype, "addRestaurantToList", null);
__decorate([
    (0, common_1.Get)('/list'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RestaurantController.prototype, "findAllMyLists", null);
__decorate([
    (0, common_1.Post)('/list'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_restaurant_lists_dto_1.CreateRestaurantListsDto]),
    __metadata("design:returntype", Promise)
], RestaurantController.prototype, "createList", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('/:restaurantId'),
    __param(0, (0, common_1.Param)('restaurantId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], RestaurantController.prototype, "findDetailByIdAndUserId", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)('/:restaurantId'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('restaurantId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], RestaurantController.prototype, "removeMyRestaurant", null);
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
], RestaurantController.prototype, "findMyRestaurantListItems", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_restaurant_dto_1.CreateRestaurantDto]),
    __metadata("design:returntype", void 0)
], RestaurantController.prototype, "createMyRestaurant", null);
exports.RestaurantController = RestaurantController = __decorate([
    (0, common_1.Controller)('restaurants'),
    __metadata("design:paramtypes", [restaurant_service_1.RestaurantService,
        restaurant_lists_service_1.RestaurantListsService,
        restaurant_list_items_service_1.RestaurantListItemsService])
], RestaurantController);
//# sourceMappingURL=restaurant.controller.js.map