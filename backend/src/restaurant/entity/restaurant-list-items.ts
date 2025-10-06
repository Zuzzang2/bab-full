import { RestaurantListsEntity } from './restaurant-lists.entity';
import { RestaurantEntity } from './restaurant.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';

@Entity('restaurant_list_items')
@Unique(['listId', 'restaurantId']) // 리스트+식당 조합 유니크
export class RestaurantListItemsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => RestaurantListsEntity, (list) => list.items, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'listId' })
  list: RestaurantListsEntity;

  @Column()
  listId: number;

  @ManyToOne(() => RestaurantEntity, (restaurant) => restaurant.items, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'restaurantId' })
  restaurant: RestaurantEntity;

  @Column()
  restaurantId: number;

  @CreateDateColumn()
  createdAt: Date;
}
