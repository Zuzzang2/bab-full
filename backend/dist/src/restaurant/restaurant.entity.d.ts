import { User } from 'src/users/user.entity';
export declare class RestaurantEntity {
    id: number;
    title: string;
    link: string;
    category: string;
    description: string;
    telephone: string;
    address: string;
    roadAddress: string;
    mapx: number;
    mapy: number;
    user: User;
    userId: number;
    createdAt: Date;
}
