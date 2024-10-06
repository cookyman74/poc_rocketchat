import { Injectable } from '@nestjs/common';
import { RocketChatHttpService } from '../common/rocket-chat-http.service';
import { CreateRoomDto } from '../dto/create-room.dto';
import { InviteUserDto } from '../dto/invite-user.dto';

@Injectable()
export class GroupChatService {
  constructor(private readonly rocketChatHttpService: RocketChatHttpService) {}

  // 채팅방 생성
  async createRoom(dto: CreateRoomDto) {
    return this.rocketChatHttpService.post('/groups.create', {
      name: dto.roomName, // "roomName"을 "name"으로 수정
      members: dto.members,
    });
  }

  async inviteUserToRoom(dto: InviteUserDto) {
    return this.rocketChatHttpService.post('/groups.invite', dto);
  }

  async getRooms() {
    return this.rocketChatHttpService.get('/groups.list');
  }
}
