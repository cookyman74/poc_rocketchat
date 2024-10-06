import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class RocketChatHttpService {
  private readonly logger = new Logger(RocketChatHttpService.name);
  private readonly baseUrl: string;
  private readonly authToken: string;
  private readonly userId: string;

  constructor(private readonly httpService: HttpService) {
    this.baseUrl = process.env.ROCKET_CHAT_BASE_URL || 'http://localhost:3000/api/v1';
    this.authToken = process.env.ROCKET_CHAT_AUTH_TOKEN;
    this.userId = process.env.ROCKET_CHAT_USER_ID;
  }

  private getHeaders() {
    return {
      'X-Auth-Token': this.authToken,
      'X-User-Id': this.userId,
      'Content-Type': 'application/json',
    };
  }

  async post<T>(endpoint: string, body: any) {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = this.getHeaders();

    try {
      const response = await firstValueFrom(
        this.httpService.post(url, body, { headers }),
      );
      return response.data;
    } catch (error) {
      this.logger.error(`Error making POST request to ${url}`, error);
      if (error.response) {
        this.logger.error(`Response data: ${JSON.stringify(error.response.data)}`);
        this.logger.error(`Request body: ${JSON.stringify(body)}`);  // 요청 데이터도 로그에 출력
      }
      throw new Error(`Unable to complete POST request to ${url}`);
    }
  }


  async get<T>(endpoint: string) {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = this.getHeaders();

    try {
      const response = await firstValueFrom(
        this.httpService.get(url, { headers }),
      );
      return response.data;
    } catch (error) {
      this.logger.error(`Error making GET request to ${url}`, error);
      throw new Error(`Unable to complete GET request to ${url}`);
    }
  }
}
