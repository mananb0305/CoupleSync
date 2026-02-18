import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Couple } from './entities/couple.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class CouplesService {
    constructor(
        @InjectRepository(Couple)
        private couplesRepository: Repository<Couple>,
        private usersService: UsersService,
    ) { }

    async create(user1Id: string, user2Email: string): Promise<Couple> {
        const user1 = await this.usersService.findOneById(user1Id);
        const user2 = await this.usersService.findOneByEmail(user2Email);

        if (!user1 || !user2) {
            throw new BadRequestException('Partner not found');
        }

        if (user1.coupleId || user2.coupleId) {
            throw new BadRequestException('One of the users is already in a couple');
        }

        const couple = this.couplesRepository.create({
            user1Id: user1.id,
            user2Id: user2.id,
        });
        const savedCouple = await this.couplesRepository.save(couple);

        await this.usersService.update(user1.id, { coupleId: savedCouple.id });
        await this.usersService.update(user2.id, { coupleId: savedCouple.id });

        return savedCouple;
    }

    async findOne(id: string): Promise<Couple> {
        return this.couplesRepository.findOne({ where: { id } });
    }

    async findByUser(userId: string): Promise<Couple> {
        return this.couplesRepository.findOne({
            where: [{ user1Id: userId }, { user2Id: userId }],
        });
    }
}
