import { Type } from '@nestjs/common';
import { IQueryHandler } from '@nestjs/cqrs';

import { GetBookByIdQueryHandler } from './get-book-by-id/get-book-by-id.query-handler';
import { GetBooksQueryHandler } from './get-books/get-books.query-handler';

export * from './get-book-by-id/get-book-by-id.query';
export * from './get-book-by-id/get-book-by-id.query-handler';
export * from './get-books/get-books.query';
export * from './get-books/get-books.query-handler';

export const BOOK_QUERIES_HANDLERS: Type<IQueryHandler>[] = [GetBookByIdQueryHandler, GetBooksQueryHandler];
