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
exports.RestaurantRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const restaurant_entity_1 = require("./restaurant.entity");
let RestaurantRepository = class RestaurantRepository extends typeorm_1.Repository {
    dataSource;
    constructor(dataSource) {
        super(restaurant_entity_1.RestaurantEntity, dataSource.createEntityManager());
        this.dataSource = dataSource;
    }
    async createAndSave(data) {
        const restaurant = this.create(data);
        return this.save(restaurant);
    }
    async findOneByIdOrFail(id) {
        const restaurant = await this.findOne({ where: { id } });
        if (!restaurant) {
            throw new common_1.NotFoundException('해당 맛집이 존재하지 않습니다.');
        }
        return restaurant;
    }
    async deleteByIdOrFail(id) {
        const restaurant = await this.findOne({ where: { id } });
        if (!restaurant) {
            throw new common_1.NotFoundException('해당 맛집이 존재하지 않습니다!');
        }
        return this.remove(restaurant);
    }
};
exports.RestaurantRepository = RestaurantRepository;
exports.RestaurantRepository = RestaurantRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], RestaurantRepository);
//# sourceMappingURL=restaurant.repository.js.map