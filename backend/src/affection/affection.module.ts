import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AffectionService } from './affection.service';
import { AffectionController } from './affection.controller';
import { Reward } from './entities/reward.entity';
import { UsersModule } from '../users/users.module';
import { CouplesModule } from '../couples/couples.module';

@Module({
    imports: [TypeOrmModule.forFeature([Reward]), UsersModule, CouplesModule],
    controllers: [AffectionController],
    providers: [AffectionService],
})
export class AffectionModule { }
