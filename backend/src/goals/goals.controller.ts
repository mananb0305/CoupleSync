import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { GoalsService } from './goals.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('goals')
@UseGuards(AuthGuard('jwt'))
export class GoalsController {
    constructor(private readonly goalsService: GoalsService) { }

    @Post()
    create(@Request() req, @Body() createGoalDto: any) {
        return this.goalsService.create(req.user.id, createGoalDto);
    }

    @Get()
    findAll(@Request() req) {
        return this.goalsService.findAllByUser(req.user.id);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.goalsService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateGoalDto: any) {
        return this.goalsService.update(id, updateGoalDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.goalsService.remove(id);
    }

    @Post(':id/complete')
    markComplete(@Param('id') id: string, @Body('date') date: string) {
        return this.goalsService.markComplete(id, date);
    }
}
