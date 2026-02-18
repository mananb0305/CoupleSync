import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Goal } from './entities/goal.entity';

@Injectable()
export class GoalsService {
    constructor(
        @InjectRepository(Goal)
        private goalsRepository: Repository<Goal>,
    ) { }

    async create(userId: string, createGoalDto: Partial<Goal>): Promise<Goal> {
        const goal = this.goalsRepository.create({ ...createGoalDto, userId });
        return this.goalsRepository.save(goal);
    }

    async findAllByUser(userId: string): Promise<Goal[]> {
        return this.goalsRepository.find({ where: { userId } });
    }

    async findOne(id: string): Promise<Goal> {
        const goal = await this.goalsRepository.findOne({ where: { id } });
        if (!goal) throw new NotFoundException('Goal not found');
        return goal;
    }

    async update(id: string, updateGoalDto: Partial<Goal>): Promise<Goal> {
        await this.goalsRepository.update(id, updateGoalDto);
        return this.findOne(id);
    }

    async remove(id: string): Promise<void> {
        await this.goalsRepository.delete(id);
    }

    async markComplete(id: string, date: string): Promise<Goal> {
        const goal = await this.findOne(id);
        const dates = goal.completedDates || [];
        if (!dates.includes(date)) {
            dates.push(date);
        }
        goal.completedDates = dates;
        return this.goalsRepository.save(goal);
    }
}
