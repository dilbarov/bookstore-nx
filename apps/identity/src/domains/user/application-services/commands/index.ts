import { Type } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';

export const USER_COMMANDS_HANDLERS: Type<ICommandHandler>[] = [];
