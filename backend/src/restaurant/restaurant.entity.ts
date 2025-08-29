import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('restaurants')
export class RestaurantEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ default: '기타' }) // DB
    category: string; // DTO

    @Column()
    address: string;

    @Column({ type: 'text', nullable: true })
    description?: string;

    @Column({ type: 'varchar', length: 20, nullable: true })
    phone?: string;

    @Column({ type: 'text', array: true, nullable: true })
    // "menu1,menu2,menu3" 형태로 저장됨
    menu?: string[];
}
