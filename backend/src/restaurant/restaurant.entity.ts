import { User } from 'src/users/user.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    Unique,
} from 'typeorm';

@Entity('restaurants')
@Unique(['userId', 'roadAddress'])
export class RestaurantEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({ nullable: true })
    link: string;

    @Column({ nullable: true })
    category: string;

    @Column({ nullable: true })
    description: string;

    @Column({ nullable: true })
    telephone: string;

    @Column()
    address: string; // 지번 주소

    @Column()
    roadAddress: string; // 도로명 주소

    @Column({ type: 'bigint' })
    mapx: number; // X좌표 (경도)

    @Column({ type: 'bigint' })
    mapy: number; // Y좌표 (위도)

    @ManyToOne(() => User, (user) => user.restaurants, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'userId' })
    user: User;

    @Column()
    userId: number;
}
