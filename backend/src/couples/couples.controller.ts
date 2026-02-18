import { Controller, Post, Body, UseGuards, Request, Get, BadRequestException } from '@nestjs/common';
import { CouplesService } from './couples.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('couples')
export class CouplesController {
    constructor(private couplesService: CouplesService) { }

    @UseGuards(AuthGuard('jwt'))
    @Post('invite')
    async invitePartner(@Request() req, @Body() body: { email: string }) {
        if (req.user.email === body.email) {
            throw new BadRequestException('Cannot invite yourself');
        }
        return this.couplesService.create(req.user.id, body.email);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('my-couple')
    async getMyCouple(@Request() req) {
        return this.couplesService.findByUser(req.user.id);
    }
}
