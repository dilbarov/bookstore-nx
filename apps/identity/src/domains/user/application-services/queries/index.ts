import { Type } from '@nestjs/common';
import { IQueryHandler } from '@nestjs/cqrs';

import { GetUserByEmailQueryHandler } from './get-user-by-email/get-user-by-email.query-handler';
import { GetUserByIdQueryHandler } from './get-user-by-id/get-user-by-id.query-handler';

export * from './get-user-by-email/get-user-by-email.query';
export * from './get-user-by-email/get-user-by-email.query-handler';
export * from './get-user-by-id/get-user-by-id.query';
export * from './get-user-by-id/get-user-by-id.query-handler';

export const USER_QUERIES_HANDLERS: Type<IQueryHandler>[] = [GetUserByIdQueryHandler, GetUserByEmailQueryHandler];
