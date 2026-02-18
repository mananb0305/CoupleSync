import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    const coupleId = client.handshake.query.coupleId as string;
    if (coupleId) {
      client.join(`couple_${coupleId}`);
      console.log(`Client connected: ${client.id}, joined couple_${coupleId}`);
    }
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  notifyCouple(coupleId: string, event: string, payload: any) {
    this.server.to(`couple_${coupleId}`).emit(event, payload);
  }
}
