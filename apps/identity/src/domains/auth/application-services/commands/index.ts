import { Type } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';

import { GenerateAccessTokenCommandHandler } from './generate-access-token/generate-access-token.command-handler';
import { GenerateRefreshTokenCommandHandler } from './generate-refresh-token/generate-refresh-token.command-handler';
import { LoginCommandHandler } from './login/login.command-handler';
import { LogoutCommandHandler } from './logout/logout.command-handler';
import { RegisterCommandHandler } from './register/register.command-handler';

export * from './generate-access-token/generate-access-token.command';
export * from './generate-access-token/generate-access-token.command-handler';
export * from './generate-refresh-token/generate-refresh-token.command';
export * from './generate-refresh-token/generate-refresh-token.command-handler';
export * from './login/login.command';
export * from './login/login.command-handler';
export * from './logout/logout.command';
export * from './logout/logout.command-handler';
export * from './register/register.command';
export * from './register/register.command-handler';

export const AUTH_COMMANDS_HANDLERS: Type<ICommandHandler>[] = [
  LoginCommandHandler,
  LogoutCommandHandler,
  RegisterCommandHandler,
  GenerateAccessTokenCommandHandler,
  GenerateRefreshTokenCommandHandler,
];
