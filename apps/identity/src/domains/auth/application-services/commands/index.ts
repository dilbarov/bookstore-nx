import { Type } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';

export const AUTH_COMMANDS_HANDLERS: Type<ICommandHandler>[] = [];
