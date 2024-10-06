import { Injectable } from '@nestjs/common';
import { RocketChatHttpService } from '../common/rocket-chat-http.service';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly rocketChatHttpService: RocketChatHttpService) {}

  async createUser(dto: CreateUserDto) {
    return this.rocketChatHttpService.post('/users.create', dto);
  }

  async searchUser(username: string) {
    return this.rocketChatHttpService.get(`/users.list?query={"username":"${username}"}`);
  }
}
