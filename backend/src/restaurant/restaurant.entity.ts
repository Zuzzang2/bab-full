import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('restaurants')
export class RestaurantEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({ nullable: true })
    link: string;

    @Column({ nullable: true })
    category: string; //  음식점>일식>일식당

    @Column({ nullable: true })
    description: string;

    @Column({ nullable: true })
    telephone: string;

    @Column()
    address: string; // 지번 주소

    @Column({ unique: true })
    roadAddress: string; // 도로명 주소

    @Column({ type: 'bigint' })
    mapx: number; // X좌표 (경도)

    @Column({ type: 'bigint' })
    mapy: number; // Y좌표 (위도)
}
