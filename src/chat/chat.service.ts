import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class RocketChatService {
  private readonly logger = new Logger(RocketChatService.name);
  private readonly baseUrl: string;
  private readonly authToken: string;
  private readonly userId: string;

  constructor(private readonly httpService: HttpService) {
    this.baseUrl = process.env.ROCKET_CHAT_BASE_URL || 'http://localhost:3000/api/v1';
    this.authToken = process.env.ROCKET_CHAT_AUTH_TOKEN;
    this.userId = process.env.ROCKET_CHAT_USER_ID;
  }

  // 채널 생성
  async createChannel(channelName: string) {
    const url = `${this.baseUrl}/channels.create`;

    const headers = {
      'X-Auth-Token': this.authToken,
      'X-User-Id': this.userId,
      'Content-Type': 'application/json',
    };

    const body = {
      name: channelName,
    };

    try {
      const response = await firstValueFrom(
        this.httpService.post(url, body, { headers }),
      );
      return response.data;
    } catch (error) {
      this.logger.error('Error creating channel', error);
      throw new Error('Unable to create channel');
    }
  }


  // 채팅방 리스트 조회
  async getRooms() {
    const url = `${this.baseUrl}/groups.list`;

    const headers = {
      'X-Auth-Token': this.authToken,
      'X-User-Id': this.userId,
    };

    try {
      const response = await firstValueFrom(
        this.httpService.get(url, { headers }),
      );
      return response.data;
    } catch (error) {
      this.logger.error('Error fetching Rocket.Chat rooms', error);
      throw new Error('Unable to fetch Rocket.Chat rooms');
    }
  }


  // 사용자 생성
  async createUser(username: string, email: string, password: string) {
    const url = `${this.baseUrl}/users.create`;

    const headers = {
      'X-Auth-Token': this.authToken,
      'X-User-Id': this.userId,
      'Content-Type': 'application/json',
    };

    const body = {
      username,
      email,
      password,
    };

    try {
      const response = await firstValueFrom(
        this.httpService.post(url, body, { headers }),
      );
      return response.data;
    } catch (error) {
      this.logger.error('Error creating user', error);
      throw new Error('Unable to create user');
    }
  }

  // 새로운 채팅방 생성
  async createRoom(roomName: string, members: string[]) {
    const url = `${this.baseUrl}/groups.create`;

    const headers = {
      'X-Auth-Token': this.authToken,
      'X-User-Id': this.userId,
    };

    const body = {
      name: roomName,
      members,
    };

    try {
      const response = await firstValueFrom(
        this.httpService.post(url, body, { headers }),
      );
      return response.data;
    } catch (error) {
      this.logger.error('Error creating Rocket.Chat room', error);
      throw new Error('Unable to create Rocket.Chat room');
    }
  }

  // 특정 사용자 검색
  async searchUser(username: string) {
    const url = `${this.baseUrl}/users.list?query={"username": "${username}"}`;

    const headers = {
      'X-Auth-Token': this.authToken,
      'X-User-Id': this.userId,
    };

    try {
      const response = await firstValueFrom(
        this.httpService.get(url, { headers }),
      );
      return response.data.users;
    } catch (error) {
      this.logger.error('Error searching for user', error);
      throw new Error('Unable to search for user');
    }
  }

  // 채팅방에 사용자 초대
  async inviteUserToRoom(roomId: string, username: string) {
    const url = `${this.baseUrl}/groups.invite`;

    const headers = {
      'X-Auth-Token': this.authToken,
      'X-User-Id': this.userId,
    };

    const body = {
      roomId,
      username,
    };

    try {
      const response = await firstValueFrom(
        this.httpService.post(url, body, { headers }),
      );
      return response.data;
    } catch (error) {
      this.logger.error('Error inviting user to Rocket.Chat room', error);
      throw new Error('Unable to invite user to Rocket.Chat room');
    }
  }

  // 메시지 전송
  async sendMessage(roomId: string, message: string) {
    const url = `${this.baseUrl}/chat.sendMessage`;

    const headers = {
      'X-Auth-Token': this.authToken,
      'X-User-Id': this.userId,
      'Content-Type': 'application/json',
    };

    const body = {
      message: {
        rid: roomId,
        msg: message,
      },
    };

    try {
      const response = await firstValueFrom(
        this.httpService.post(url, body, { headers }),
      );
      return response.data;
    } catch (error) {
      this.logger.error('Error sending message', error);
      throw new Error('Unable to send message');
    }
  }

  // 메시지 조회
  async getMessages(roomId: string) {
    const url = `${this.baseUrl}/channels.messages?roomId=${roomId}`;

    const headers = {
      'X-Auth-Token': this.authToken,
      'X-User-Id': this.userId,
    };

    try {
      const response = await firstValueFrom(
        this.httpService.get(url, { headers }),
      );
      return response.data;
    } catch (error) {
      this.logger.error('Error fetching messages', error);
      throw new Error('Unable to fetch messages');
    }
  }

  // 다이렉트 메시지 채널 생성
  async createDirectMessage(username: string) {
    const url = `${this.baseUrl}/im.create`;

    const headers = {
      'X-Auth-Token': this.authToken,
      'X-User-Id': this.userId,
      'Content-Type': 'application/json',
    };

    const body = {
      username,
    };

    try {
      const response = await firstValueFrom(
        this.httpService.post(url, body, { headers }),
      );
      return response.data;
    } catch (error) {
      this.logger.error('Error creating direct message channel', error);
      throw new Error('Unable to create direct message channel');
    }
  }

  // 다이렉트 메시지 전송
  async sendDirectMessage(roomId: string, message: string) {
    const url = `${this.baseUrl}/chat.sendMessage`;

    const headers = {
      'X-Auth-Token': this.authToken,
      'X-User-Id': this.userId,
      'Content-Type': 'application/json',
    };

    const body = {
      message: {
        rid: roomId,
        msg: message,
      },
    };

    try {
      const response = await firstValueFrom(
        this.httpService.post(url, body, { headers }),
      );
      return response.data;
    } catch (error) {
      this.logger.error('Error sending direct message', error);
      throw new Error('Unable to send direct message');
    }
  }

  // 다이렉트 메시지 채널의 메시지 조회
  async getDirectMessages(roomId: string) {
    const url = `${this.baseUrl}/im.messages?roomId=${roomId}`;

    const headers = {
      'X-Auth-Token': this.authToken,
      'X-User-Id': this.userId,
    };

    try {
      const response = await firstValueFrom(
        this.httpService.get(url, { headers }),
      );
      return response.data;
    } catch (error) {
      this.logger.error('Error fetching direct messages', error);
      throw new Error('Unable to fetch direct messages');
    }
  }

}
