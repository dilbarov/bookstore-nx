import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IToken } from '@bookstore-nx/entities';

export const CurrentUser = createParamDecorator((data: string, ctx: ExecutionContext): IToken => {
  const request = ctx.switchToHttp().getRequest();
  return request.user as IToken;
});
