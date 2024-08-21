import { Type } from '@nestjs/common';
import { IQueryHandler } from '@nestjs/cqrs';

export const AUTH_QUERIES_HANDLERS: Type<IQueryHandler>[] = [];
