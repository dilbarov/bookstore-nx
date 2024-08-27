import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const CurrentUserId = createParamDecorator((data: string, context: ExecutionContext) => {
  const ctx = GqlExecutionContext.create(context);
  const request = ctx.getContext().req;
  return request?.user?.id;
});
