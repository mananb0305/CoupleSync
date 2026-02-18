import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { EventsGateway } from '../events/events.gateway';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private tasksRepository: Repository<Task>,
        private eventsGateway: EventsGateway,
    ) { }

    async create(coupleId: string, createTaskDto: Partial<Task>): Promise<Task> {
        const task = this.tasksRepository.create({ ...createTaskDto, coupleId });
        const savedTask = await this.tasksRepository.save(task);
        this.eventsGateway.notifyCouple(coupleId, 'task_created', savedTask);
        return savedTask;
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
        const updatedTask = await this.findOne(id);
        if (updatedTask.coupleId) {
            this.eventsGateway.notifyCouple(updatedTask.coupleId, 'task_updated', updatedTask);
        }
        return updatedTask;
    }

    async remove(id: string): Promise<void> {
        const task = await this.findOne(id);
        const coupleId = task.coupleId;
        await this.tasksRepository.delete(id);
        if (coupleId) {
            this.eventsGateway.notifyCouple(coupleId, 'task_deleted', { id });
        }
    }
}
