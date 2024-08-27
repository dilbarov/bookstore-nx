import { TokensDto } from '@bookstore-nx/entities';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { Response } from 'express';

import { CurrentUserId } from '../../../shared/decorators/current-user-id.decorator';
import { Public } from '../../../shared/decorators/public.decorator';
import { AuthService } from '../services/auth.service';

@Resolver()
export class AuthResolver {
  public constructor(private readonly authService: AuthService) {}

  @Public()
  @Mutation(() => TokensDto)
  public async login(
    @Args('email') email: string,
    @Args('fingerprint') fingerprint: string,
    @Args('password') password: string,
    @Context() context: any,
  ): Promise<TokensDto> {
    const result = await this.authService.login(email, password, fingerprint);
    const response: Response = context.res;

    if (response.headersSent) {
      return;
    }

    response.cookie('auth', result.accessToken);

    return result;
  }

  @Public()
  @Mutation(() => TokensDto)
  public async register(
    @Args('email') email: string,
    @Args('fingerprint') fingerprint: string,
    @Args('password') password: string,
    @Context() context: any,
  ): Promise<TokensDto> {
    const result = await this.authService.register(email, password, fingerprint);
    const response: Response = context.res;

    if (response.headersSent) {
      return;
    }

    response.cookie('auth', result.accessToken);

    return result;
  }

  @Public()
  @Mutation(() => TokensDto)
  public async refreshTokens(
    @Args('refreshToken') refreshToken: string,
    @Args('fingerprint') fingerprint: string,
  ): Promise<TokensDto> {
    return await this.authService.refreshTokens(refreshToken, fingerprint);
  }

  @Mutation(() => Boolean)
  public async logout(@CurrentUserId() id: string, @Args('fingerprint') fingerprint: string): Promise<boolean> {
    await this.authService.logout(id, fingerprint);
    return true;
  }
}
