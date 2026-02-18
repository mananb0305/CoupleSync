import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reward } from './entities/reward.entity';
import { UsersService } from '../users/users.service';
import { CouplesService } from '../couples/couples.service';

@Injectable()
export class AffectionService {
    constructor(
        @InjectRepository(Reward)
        private rewardsRepository: Repository<Reward>,
        private usersService: UsersService,
        private couplesService: CouplesService,
    ) { }

    async sendReward(userId: string, type: string, message?: string): Promise<Reward> {
        const sender = await this.usersService.findOneById(userId);
        if (!sender.coupleId) {
            throw new BadRequestException('You are not in a couple');
        }

        const couple = await this.couplesService.findOne(sender.coupleId);
        if (!couple) {
            throw new BadRequestException('Couple not found');
        }

        const partnerId = couple.user1Id === userId ? couple.user2Id : couple.user1Id;
        if (!partnerId) {
            throw new BadRequestException('Partner has not joined yet');
        }

        return this.rewardsRepository.save({
            type,
            message,
            senderId: userId,
            coupleId: sender.coupleId,
            receiverId: partnerId,
            points: 10 // Default points
        });
    }

    async getHistory(coupleId: string): Promise<Reward[]> {
        return this.rewardsRepository.find({
            where: { coupleId },
            order: { createdAt: 'DESC' },
        });
    }
}
