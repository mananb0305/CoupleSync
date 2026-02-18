import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './entities/event.entity';

@Injectable()
export class EventsService {
    constructor(
        @InjectRepository(Event)
        private eventsRepository: Repository<Event>,
    ) { }

    async create(coupleId: string, userId: string, createEventDto: Partial<Event>): Promise<Event> {
        const event = this.eventsRepository.create({
            ...createEventDto,
            coupleId,
            createdByUserId: userId,
        });
        return this.eventsRepository.save(event);
    }

    async findAllByCouple(coupleId: string): Promise<Event[]> {
        return this.eventsRepository.find({
            where: { coupleId },
            order: { startDate: 'ASC' },
        });
    }

    async findOne(id: string): Promise<Event> {
        const event = await this.eventsRepository.findOne({ where: { id } });
        if (!event) throw new NotFoundException('Event not found');
        return event;
    }

    async update(id: string, updateEventDto: Partial<Event>): Promise<Event> {
        await this.eventsRepository.update(id, updateEventDto);
        return this.findOne(id);
    }

    async remove(id: string): Promise<void> {
        await this.eventsRepository.delete(id);
    }
}
