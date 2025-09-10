import { ListEntity } from './list.entity';
import { RestaurantEntity } from '../restaurant/restaurant.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
    Unique,
} from 'typeorm';

@Entity('list_rows')
@Unique(['listId', 'restaurantId']) // 리스트+식당 조합 유니크
export class ListRowEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => ListEntity, (list) => list.rows, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'listId' })
    list: ListEntity;

    @Column()
    listId: number;

    @ManyToOne(() => RestaurantEntity, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'restaurantId' })
    restaurant: RestaurantEntity;

    @Column()
    restaurantId: number;

    @CreateDateColumn()
    createdAt: Date;
}
