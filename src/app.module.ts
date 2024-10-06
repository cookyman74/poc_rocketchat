import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import rocketChatConfig from './config/rocket-chat.config';
// import { ChatModule } from './chat/chat.module';
import { HttpModule } from '@nestjs/axios';
import { RocketChatHttpService } from './common/rocket-chat-http.service';
import { GroupChatService } from './group-chat/group-chat.service';
import { ChannelChatService } from './channel-chat/channel-chat.service';
import { DirectChatService } from './direct-chat/direct-chat.service';
import { UserService } from './user/user.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [rocketChatConfig],
    }),
    HttpModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    RocketChatHttpService,
    GroupChatService,
    ChannelChatService,
    DirectChatService,
    UserService,
  ],
})
export class AppModule {}
