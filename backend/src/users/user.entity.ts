import { RestaurantEntity } from 'src/restaurant/entity/restaurant.entity';
import { RestaurantListsEntity } from 'src/restaurant/entity/restaurant-lists.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    OneToMany,
} from 'typeorm';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ unique: true })
    nickname: string;

    @CreateDateColumn()
    createdAt: Date;

    @OneToMany(() => RestaurantEntity, (restaurant) => restaurant.user)
    restaurants: RestaurantEntity[];

    @OneToMany(() => RestaurantListsEntity, (list) => list.user)
    lists: RestaurantListsEntity[];
}
