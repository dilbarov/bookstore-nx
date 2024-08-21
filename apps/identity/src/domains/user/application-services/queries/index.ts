import { Type } from '@nestjs/common';
import { IQueryHandler } from '@nestjs/cqrs';

export const USER_QUERIES_HANDLERS: Type<IQueryHandler>[] = [];
