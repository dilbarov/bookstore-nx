import { Type } from '@nestjs/common';
import { IQueryHandler } from '@nestjs/cqrs';

export const BOOK_QUERIES_HANDLERS: Type<IQueryHandler>[] = [];
