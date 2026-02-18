import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, BadRequestException } from '@nestjs/common';
import { EventsService } from './events.service';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from '../users/users.service';

@Controller('events')
@UseGuards(AuthGuard('jwt'))
export class EventsController {
    constructor(
        private readonly eventsService: EventsService,
        private readonly usersService: UsersService,
    ) { }

    @Post()
    async create(@Request() req, @Body() createEventDto: any) {
        const user = await this.usersService.findOneById(req.user.id);
        if (!user.coupleId) {
            throw new BadRequestException('You need to be in a couple to create shared events');
        }
        return this.eventsService.create(user.coupleId, user.id, createEventDto);
    }

    @Get()
    async findAll(@Request() req) {
        const user = await this.usersService.findOneById(req.user.id);
        if (!user.coupleId) {
            return [];
        }
        return this.eventsService.findAllByCouple(user.coupleId);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.eventsService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateEventDto: any) {
        return this.eventsService.update(id, updateEventDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.eventsService.remove(id);
    }
}
