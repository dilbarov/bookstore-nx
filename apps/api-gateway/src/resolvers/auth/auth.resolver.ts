import { TokensDto } from '@bookstore-nx/entities';
import {
  AmqpService,
  LoginContract,
  LogoutContract,
  RefreshTokensContract,
  RegisterContract,
} from '@bookstore-nx/microservices';
import { Response } from 'express';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentUserId } from '../../decorators/current-user-id.decorator';
import { Public } from '../../decorators/public.decorator';

@Resolver()
export class AuthResolver {
  public constructor(private readonly amqpService: AmqpService) {}

  @Public()
  @Mutation(() => TokensDto)
  public async login(
    @Args('email') email: string,
    @Args('fingerprint') fingerprint: string,
    @Args('password') password: string,
    @Context() context: any,
  ): Promise<TokensDto> {
    const result = await this.amqpService.request<LoginContract.request['payload'], LoginContract.response['payload']>(
      LoginContract.queue,
      {
        email,
        password,
        fingerprint,
      },
    );
    const response: Response = context.res;

    if (response.headersSent) {
      return;
    }

    response.setHeader('Authorization', `Bearer ${result.accessToken}`);

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
    const result = await this.amqpService.request<
      RegisterContract.request['payload'],
      RegisterContract.response['payload']
    >(RegisterContract.queue, { password, fingerprint, email });

    const response: Response = context.res;

    if (response.headersSent) {
      return;
    }

    response.cookie('auth', result.accessToken);

    return result;
  }

  @Mutation(() => TokensDto)
  public async refreshTokens(
    @Args('refreshToken') refreshToken: string,
    @Args('fingerprint') fingerprint: string,
  ): Promise<TokensDto> {
    return await this.amqpService.request<
      RefreshTokensContract.request['payload'],
      RefreshTokensContract.response['payload']
    >(RefreshTokensContract.queue, { refreshToken, fingerprint });
  }

  @Mutation(() => Boolean)
  public async logout(@CurrentUserId() id: string, @Args('fingerprint') fingerprint: string): Promise<boolean> {
    await this.amqpService.publish<LogoutContract.request['payload']>(LogoutContract.queue, { id, fingerprint });
    return true;
  }
}
