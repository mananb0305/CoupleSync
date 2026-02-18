import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, BadRequestException } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from '../users/users.service';

@Controller('tasks')
@UseGuards(AuthGuard('jwt'))
export class TasksController {
    constructor(
        private readonly tasksService: TasksService,
        private readonly usersService: UsersService,
    ) { }

    @Post()
    async create(@Request() req, @Body() createTaskDto: any) {
        const user = await this.usersService.findOneById(req.user.id);
        if (!user.coupleId) {
            throw new BadRequestException('You need to be in a couple to create shared tasks');
        }
        return this.tasksService.create(user.coupleId, createTaskDto);
    }

    @Get()
    async findAll(@Request() req) {
        const user = await this.usersService.findOneById(req.user.id);
        if (!user.coupleId) {
            return [];
        }
        return this.tasksService.findAllByCouple(user.coupleId);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.tasksService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateTaskDto: any) {
        return this.tasksService.update(id, updateTaskDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.tasksService.remove(id);
    }
}
