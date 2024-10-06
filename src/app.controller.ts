import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { GroupChatService } from './group-chat/group-chat.service';
import { ChannelChatService } from './channel-chat/channel-chat.service';
import { DirectChatService } from './direct-chat/direct-chat.service';
import { UserService } from './user/user.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { CreateChannelDto } from './dto/create-channel.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { InviteUserDto } from './dto/invite-user.dto';
import { SendMessageDto } from './dto/send-message.dto';

@Controller('chat')
export class AppController {
  constructor(
    private readonly groupChatService: GroupChatService,
    private readonly channelChatService: ChannelChatService,
    private readonly directChatService: DirectChatService,
    private readonly userService: UserService,
  ) {}

  // 채팅방 리스트 조회 (그룹)
  @Get('rooms')
  async getRooms() {
    return this.groupChatService.getRooms();
  }

  // 새로운 그룹 채팅방 생성
  @Post('create-room')
  async createRoom(@Body() createRoomDto: CreateRoomDto) {
    return this.groupChatService.createRoom(createRoomDto);
  }

  // 메신저 사용자 생성
  @Post('create-user')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  // 특정 사용자 검색
  @Get('search-user')
  async searchUser(@Query('username') username: string) {
    return this.userService.searchUser(username);
  }

  // 그룹 채팅방에 사용자 초대
  @Post('invite')
  async inviteUser(@Body() inviteUserDto: InviteUserDto) {
    return this.groupChatService.inviteUserToRoom(inviteUserDto);
  }

  // 채널 채팅방 생성
  @Post('create-channel')
  async createChannel(@Body() createChannelDto: CreateChannelDto) {
    return this.channelChatService.createChannel(createChannelDto);
  }

  // 채널 메시지 전송
  @Post('send-message')
  async sendMessage(@Body() sendMessageDto: SendMessageDto) {
    return this.channelChatService.sendMessage(sendMessageDto);
  }

  // 채널 메시지 조회
  @Get('messages')
  async getMessages(@Query('roomId') roomId: string) {
    return this.channelChatService.getMessages(roomId);
  }

  // 다이렉트 메시지 채널 생성
  @Post('create-direct-message')
  async createDirectMessage(@Body('username') username: string) {
    return this.directChatService.createDirectMessage(username);
  }

  // 다이렉트 메시지 전송
  @Post('send-direct-message')
  async sendDirectMessage(@Body() sendMessageDto: SendMessageDto) {
    return this.directChatService.sendDirectMessage(sendMessageDto);
  }

  // 다이렉트 메시지 채널의 메시지 조회
  @Get('direct-messages')
  async getDirectMessages(@Query('roomId') roomId: string) {
    return this.directChatService.getDirectMessages(roomId);
  }
}
