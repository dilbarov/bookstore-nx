import { IToken } from '@bookstore-nx/entities';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const CurrentUser = createParamDecorator((data: string, context: ExecutionContext): IToken => {
  const ctx = GqlExecutionContext.create(context);
  const { req } = ctx.getContext();
  return req.user as IToken;
});
