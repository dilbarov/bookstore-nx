import { Type } from '@nestjs/common';
import { IQueryHandler } from '@nestjs/cqrs';

import { GetAuthorByIdQueryHandler } from './get-author-by-id/get-author-by-id.query-handler';
import { GetAuthorsQueryHandler } from './get-authors/get-authors.query-handler';

export * from './get-author-by-id/get-author-by-id.query';
export * from './get-author-by-id/get-author-by-id.query-handler';
export * from './get-authors/get-authors.query';
export * from './get-authors/get-authors.query-handler';

export const AUTHOR_QUERIES_HANDLERS: Type<IQueryHandler>[] = [GetAuthorByIdQueryHandler, GetAuthorsQueryHandler];
