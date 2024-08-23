import { Args, Query, Resolver } from '@nestjs/graphql';
import { IUser, UserModel } from '@bookstore-nx/entities';
import { AmqpService, GetUserByEmailContract, GetUserByIdContract } from '@bookstore-nx/microservices';
import { CurrentUserId } from '../../decorators/current-user-id.decorator';

@Resolver(() => UserModel)
export class UserResolver {
  public constructor(private readonly amqpService: AmqpService) {}

  @Query(() => UserModel)
  public async getCurrentUser(@CurrentUserId() id: string): Promise<IUser> {
    return await this.amqpService.request<
      GetUserByIdContract.request['payload'],
      GetUserByIdContract.response['payload']
    >(GetUserByIdContract.queue, id);
  }

  @Query(() => UserModel)
  public async getUserById(@Args('id', { type: () => String }) id: string): Promise<IUser> {
    return await this.amqpService.request<
      GetUserByIdContract.request['payload'],
      GetUserByIdContract.response['payload']
    >(GetUserByIdContract.queue, id);
  }

  @Query(() => UserModel)
  public async getUserByEmail(@Args('email', { type: () => String }) email: string): Promise<IUser> {
    return await this.amqpService.request<
      GetUserByEmailContract.request['payload'],
      GetUserByEmailContract.response['payload']
    >(GetUserByEmailContract.queue, email);
  }
}
