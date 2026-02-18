import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AffectionService } from './affection.service';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from '../users/users.service';

@Controller('affection')
@UseGuards(AuthGuard('jwt'))
export class AffectionController {
    constructor(
        private readonly affectionService: AffectionService,
        private readonly usersService: UsersService,
    ) { }

    @Post('send')
    async sendReward(@Request() req, @Body() body: { type: string; message?: string }) {
        return this.affectionService.sendReward(req.user.id, body.type, body.message);
    }

    @Get('history')
    async getHistory(@Request() req) {
        const user = await this.usersService.findOneById(req.user.id);
        if (!user.coupleId) return [];
        return this.affectionService.getHistory(user.coupleId);
    }
}
