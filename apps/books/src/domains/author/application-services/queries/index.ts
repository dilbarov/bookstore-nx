import { Type } from '@nestjs/common';
import { IQueryHandler } from '@nestjs/cqrs';

export const AUTHOR_QUERIES_HANDLERS: Type<IQueryHandler>[] = [];
