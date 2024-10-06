import { Injectable } from '@nestjs/common';
import { RocketChatHttpService } from '../common/rocket-chat-http.service';
import { CreateChannelDto } from '../dto/create-channel.dto';
import { SendMessageDto } from '../dto/send-message.dto';

@Injectable()
export class ChannelChatService {
  constructor(private readonly rocketChatHttpService: RocketChatHttpService) {}

  // 채널 생성
  async createChannel(dto: CreateChannelDto) {
    return this.rocketChatHttpService.post('/channels.create', dto);
  }

  // 채널 메시지 조회
  async getMessages(roomId: string) {
    return this.rocketChatHttpService.get(`/channels.messages?roomId=${roomId}`);
  }

  // 채널에 메시지 전송
  async sendMessage(sendMessageDto: SendMessageDto) {
    const body = {
      message: {
        rid: sendMessageDto.roomId,
        msg: sendMessageDto.message,
      },
    };
    return this.rocketChatHttpService.post('/chat.sendMessage', body);
  }
}
