import { Injectable } from '@nestjs/common';
import {
  AmqpService,
  LoginContract,
  LogoutContract,
  RefreshTokensContract,
  RegisterContract,
} from '@bookstore-nx/microservices';
import { TokensDto } from '@bookstore-nx/entities';

@Injectable()
export class AuthService {
  public constructor(private readonly amqpService: AmqpService) {}

  public async register(email: string, password: string, fingerprint: string): Promise<TokensDto> {
    return await this.amqpService.request<RegisterContract.request, RegisterContract.response>(RegisterContract.queue, {
      email,
      password,
      fingerprint,
    });
  }

  public async login(email: string, password: string, fingerprint: string): Promise<TokensDto> {
    return await this.amqpService.request<LoginContract.request, LoginContract.response>(LoginContract.queue, {
      email,
      password,
      fingerprint,
    });
  }

  public async logout(id: string, fingerprint: string): Promise<void> {
    await this.amqpService.publish<LogoutContract.request>(LogoutContract.queue, { id, fingerprint });
  }

  public async refreshTokens(refreshToken: string, fingerprint: string): Promise<TokensDto> {
    return await this.amqpService.request<RefreshTokensContract.request, RefreshTokensContract.response>(
      RefreshTokensContract.queue,
      { refreshToken, fingerprint },
    );
  }
}
