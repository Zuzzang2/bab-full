import { User } from 'src/users/user.entity';
import { RestaurantListItemsEntity } from './restaurant-list-items';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    OneToMany,
    CreateDateColumn,
} from 'typeorm';

@Entity('restaurant_lists')
export class RestaurantListsEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string; // 리스트 제목

    @Column({ nullable: true })
    description: string;

    @ManyToOne(() => User, (user) => user.lists, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'userId' })
    user: User;

    @Column()
    userId: number;

    @OneToMany(() => RestaurantListItemsEntity, (item) => item.list)
    items: RestaurantListItemsEntity[];

    @CreateDateColumn()
    createdAt: Date;
}
