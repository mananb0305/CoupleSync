import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { Event } from './entities/event.entity';
import { UsersModule } from '../users/users.module';
import { EventsGateway } from './events.gateway';

@Module({
    imports: [TypeOrmModule.forFeature([Event]), UsersModule],
    controllers: [EventsController],
    providers: [EventsService, EventsGateway],
    exports: [EventsGateway],
})
export class EventsModule { }
