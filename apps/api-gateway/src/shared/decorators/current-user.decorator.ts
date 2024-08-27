import { IToken } from '@bookstore-nx/entities';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const CurrentUser = createParamDecorator((data: string, context: ExecutionContext): IToken => {
  const ctx = GqlExecutionContext.create(context);
  const request = ctx.getContext().req;
  return request.user as IToken;
});
