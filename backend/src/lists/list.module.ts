import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListEntity } from './list.entity';
import { ListRowEntity } from './list-row.entity';
import { ListService } from './list.service';
import { ListController } from './list.controller';

@Module({
    imports: [TypeOrmModule.forFeature([ListEntity, ListRowEntity])],
    controllers: [ListController],
    providers: [ListService],
})
export class ListModule {}
