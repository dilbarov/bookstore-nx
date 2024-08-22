import { IBaseFacade } from '@bookstore-nx/microservices';
import { Injectable } from '@nestjs/common';
import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs';

import { LoginDto } from '../domain/dto/login.dto';
import { LogoutDto } from '../domain/dto/logout.dto';
import { TokensDto } from '../domain/dto/tokens.dto';
import {
  LoginCommand,
  LoginCommandHandler,
  LogoutCommand,
  LogoutCommandHandler,
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
}
