import { Type } from '@nestjs/common';
import { IQueryHandler } from '@nestjs/cqrs';

import { GetBookQueryHandler } from './get-book/get-book.query-handler';
import { GetBooksQueryHandler } from './get-books/get-books.query-handler';

export * from './get-book/get-book.query';
export * from './get-book/get-book.query-handler';
export * from './get-books/get-books.query';
export * from './get-books/get-books.query-handler';

export const BOOK_QUERIES_HANDLERS: Type<IQueryHandler>[] = [GetBookQueryHandler, GetBooksQueryHandler];
