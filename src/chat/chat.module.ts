import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { RocketChatService } from './chat.service';
import { ChatController } from './chat.controller';

@Module({
  imports: [HttpModule],
  providers: [RocketChatService],
  controllers: [ChatController],
})
export class ChatModule {}
