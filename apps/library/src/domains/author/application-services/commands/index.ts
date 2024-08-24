import { Type } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';

import { CreateAuthorCommandHandler } from './create-author/create-author.command-handler';

export * from './create-author/create-author.command';
export * from './create-author/create-author.command-handler';

export const AUTHOR_COMMANDS_HANDLERS: Type<ICommandHandler>[] = [CreateAuthorCommandHandler];
