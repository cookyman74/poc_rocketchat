import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { RocketChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly rocketChatService: RocketChatService) {}

  // 채팅방 리스트 조회
  @Get('rooms')
  async getRooms() {
    return this.rocketChatService.getRooms();
  }

  // 새로운 채팅방 생성
  @Post('create-room')
  async createRoom(
    @Body('roomName') roomName: string,
    @Body('members') members: string[],
  ) {
    return this.rocketChatService.createRoom(roomName, members);
  }

  // 메신저 사용자 생성
  @Post('create-user')
  async createUser(
    @Body('username') username: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return this.rocketChatService.createUser(username, email, password);
  }

  // 특정 사용자 검색
  @Get('search-user')
  async searchUser(@Query('username') username: string) {
    return this.rocketChatService.searchUser(username);
  }

  // 채팅방에 사용자 초대
  @Post('invite')
  async inviteUser(
    @Body('roomId') roomId: string,
    @Body('username') username: string,
  ) {
    return this.rocketChatService.inviteUserToRoom(roomId, username);
  }

  @Post('send-message')
  async sendMessage(
    @Body('roomId') roomId: string,
    @Body('message') message: string,
  ) {
    return this.rocketChatService.sendMessage(roomId, message);
  }

  // 메시지 조회
  @Get('messages')
  async getMessages(@Query('roomId') roomId: string) {
    return this.rocketChatService.getMessages(roomId);
  }

  // 다이렉트 메시지 채널 생성
  @Post('create-direct-message')
  async createDirectMessage(@Body('username') username: string) {
    return this.rocketChatService.createDirectMessage(username);
  }

  // 다이렉트 메시지 전송
  @Post('send-direct-message')
  async sendDirectMessage(
    @Body('roomId') roomId: string,
    @Body('message') message: string,
  ) {
    return this.rocketChatService.sendDirectMessage(roomId, message);
  }

  // 다이렉트 메시지 채널의 메시지 조회
  @Get('direct-messages')
  async getDirectMessages(@Query('roomId') roomId: string) {
    return this.rocketChatService.getDirectMessages(roomId);
  }
}
