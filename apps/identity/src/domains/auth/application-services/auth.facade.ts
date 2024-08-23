import { LoginDto, LogoutDto, RefreshDto, TokensDto } from '@bookstore-nx/entities';
import { IBaseFacade } from '@bookstore-nx/microservices';
import { Injectable } from '@nestjs/common';
import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs';

import {
  LoginCommand,
  LoginCommandHandler,
  LogoutCommand,
  LogoutCommandHandler,
  RefreshTokensCommand,
  RefreshTokensCommandHandler,
  RegisterCommand,
  RegisterCommandHandler,
} from './commands';

@Injectable()
export class AuthFacade implements IBaseFacade {
  public constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly eventBus: EventBus,
  ) {}

  public commands = {
    login: (payload: LoginDto) => this.login(payload),
    register: (payload: LoginDto) => this.register(payload),
    logout: (payload: LogoutDto) => this.logout(payload),
    refreshTokens: (payload: RefreshDto) => this.refreshTokens(payload),
  };
  public queries = {};
  public events = {};

  private async login(payload: LoginDto): Promise<TokensDto> {
    const dto = new LoginDto(payload);
    return await this.commandBus.execute<LoginCommand, Awaited<ReturnType<LoginCommandHandler['execute']>>>(
      new LoginCommand(dto),
    );
  }

  private async register(payload: LoginDto): Promise<TokensDto> {
    const dto = new LoginDto(payload);
    return await this.commandBus.execute<RegisterCommand, Awaited<ReturnType<RegisterCommandHandler['execute']>>>(
      new RegisterCommand(dto),
    );
  }

  private async logout(payload: LogoutDto): Promise<void> {
    const dto = new LogoutDto(payload);
    return await this.commandBus.execute<LogoutCommand, Awaited<ReturnType<LogoutCommandHandler['execute']>>>(
      new LogoutCommand(dto),
    );
  }

  private async refreshTokens(payload: RefreshDto): Promise<TokensDto> {
    const dto = new RefreshDto(payload);
    return await this.commandBus.execute<
      RefreshTokensCommand,
      Awaited<ReturnType<RefreshTokensCommandHandler['execute']>>
    >(new RefreshTokensCommand(dto));
  }
}
