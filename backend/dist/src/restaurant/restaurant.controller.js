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
const update_restaurant_dto_1 = require("./dto/update-restaurant.dto");
const delete_restaurant_dto_1 = require("./dto/delete-restaurant.dto");
let RestaurantController = class RestaurantController {
    restaurantService;
    constructor(restaurantService) {
        this.restaurantService = restaurantService;
    }
    search(title) {
        return this.restaurantService.search(title);
    }
    find(title, page = '1') {
        return this.restaurantService.find(title, Number(page));
    }
    create(location) {
        return this.restaurantService.create(location);
    }
    update(id, updateRestaurantDto) {
        return this.restaurantService.update(id, updateRestaurantDto);
    }
    delete(deleteRestaurantDto) {
        return this.restaurantService.delete(deleteRestaurantDto);
    }
};
exports.RestaurantController = RestaurantController;
__decorate([
    (0, common_1.Get)('/search'),
    __param(0, (0, common_1.Query)('title')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RestaurantController.prototype, "search", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('title')),
    __param(1, (0, common_1.Query)('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], RestaurantController.prototype, "find", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Query)('location')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RestaurantController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)('/edit/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_restaurant_dto_1.UpdateRestaurantDto]),
    __metadata("design:returntype", void 0)
], RestaurantController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('/delete/:id'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [delete_restaurant_dto_1.DeleteRestaurantDto]),
    __metadata("design:returntype", void 0)
], RestaurantController.prototype, "delete", null);
exports.RestaurantController = RestaurantController = __decorate([
    (0, common_1.Controller)('restaurants'),
    __metadata("design:paramtypes", [restaurant_service_1.RestaurantService])
], RestaurantController);
//# sourceMappingURL=restaurant.controller.js.map