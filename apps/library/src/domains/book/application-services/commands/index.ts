import { Type } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';

import { CreateBookCommandHandler } from './create-book/create-book.command-handler';

export * from './create-book/create-book.command';
export * from './create-book/create-book.command-handler';

export const BOOK_COMMANDS_HANDLERS: Type<ICommandHandler>[] = [CreateBookCommandHandler];
