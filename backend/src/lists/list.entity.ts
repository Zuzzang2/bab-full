import { User } from 'src/users/user.entity';
import { ListRowEntity } from './list-row.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    OneToMany,
    CreateDateColumn,
} from 'typeorm';

@Entity('lists')
export class ListEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string; // 리스트 제목 (예: "데이트 맛집", "야식 리스트")

    @ManyToOne(() => User, (user) => user.lists, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'userId' })
    user: User;

    @Column()
    userId: number;

    @OneToMany(() => ListRowEntity, (row) => row.list)
    rows: ListRowEntity[];

    @CreateDateColumn()
    createdAt: Date;
}
