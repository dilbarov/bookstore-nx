import { Type } from '@nestjs/common';
import { IQueryHandler } from '@nestjs/cqrs';

import { GetAuthorQueryHandler } from './get-author/get-author.query-handler';
import { GetAuthorsQueryHandler } from './get-authors/get-authors.query-handler';

export * from './get-author/get-author.query';
export * from './get-author/get-author.query-handler';
export * from './get-authors/get-authors.query';
export * from './get-authors/get-authors.query-handler';

export const AUTHOR_QUERIES_HANDLERS: Type<IQueryHandler>[] = [GetAuthorQueryHandler, GetAuthorsQueryHandler];
