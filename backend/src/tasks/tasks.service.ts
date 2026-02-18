import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private tasksRepository: Repository<Task>,
    ) { }

    async create(coupleId: string, createTaskDto: Partial<Task>): Promise<Task> {
        const task = this.tasksRepository.create({ ...createTaskDto, coupleId });
        return this.tasksRepository.save(task);
    }

    async findAllByCouple(coupleId: string): Promise<Task[]> {
        return this.tasksRepository.find({ where: { coupleId }, order: { createdAt: 'DESC' } });
    }

    async findOne(id: string): Promise<Task> {
        const task = await this.tasksRepository.findOne({ where: { id } });
        if (!task) throw new NotFoundException('Task not found');
        return task;
    }

    async update(id: string, updateTaskDto: Partial<Task>): Promise<Task> {
        await this.tasksRepository.update(id, updateTaskDto);
        return this.findOne(id);
    }

    async remove(id: string): Promise<void> {
        await this.tasksRepository.delete(id);
    }
}
