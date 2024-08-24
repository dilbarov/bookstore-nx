import { IToken } from '@bookstore-nx/entities';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator((data: string, ctx: ExecutionContext): IToken => {
  const request = ctx.switchToHttp().getRequest();
  return request.user as IToken;
});
