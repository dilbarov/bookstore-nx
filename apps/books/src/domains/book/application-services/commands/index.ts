import { Type } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';

export const BOOK_COMMANDS_HANDLERS: Type<ICommandHandler>[] = [];
