import { Injectable } from '@nestjs/common';
import { RocketChatHttpService } from '../common/rocket-chat-http.service';
import { SendMessageDto } from '../dto/send-message.dto';

@Injectable()
export class DirectChatService {
  constructor(private readonly rocketChatHttpService: RocketChatHttpService) {}

  async createDirectMessage(username: string) {
    return this.rocketChatHttpService.post('/im.create', { username });
  }

  async sendDirectMessage(dto: SendMessageDto) {
    return this.rocketChatHttpService.post('/chat.sendMessage', {
      message: { rid: dto.roomId, msg: dto.message },
    });
  }

  async getDirectMessages(roomId: string) {
    return this.rocketChatHttpService.get(`/im.messages?roomId=${roomId}`);
  }
}
