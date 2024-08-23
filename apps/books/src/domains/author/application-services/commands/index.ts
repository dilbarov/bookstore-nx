import { Type } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';

export const AUTHOR_COMMANDS_HANDLERS: Type<ICommandHandler>[] = [];
