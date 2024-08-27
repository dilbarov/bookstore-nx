import { UserModel } from '@bookstore-nx/entities';
import { Args, Query, Resolver } from '@nestjs/graphql';

import { CurrentUserId } from '../../../shared/decorators/current-user-id.decorator';
import { UserService } from '../services/user.service';

@Resolver(() => UserModel)
export class UserResolver {
  public constructor(private readonly userService: UserService) {}

  @Query(() => UserModel)
  public async getCurrentUser(@CurrentUserId() id: string): Promise<UserModel> {
    return await this.userService.getUserById(id);
  }

  @Query(() => UserModel)
  public async getUserById(@Args('id', { type: () => String }) id: string): Promise<UserModel> {
    return await this.userService.getUserById(id);
  }

  @Query(() => UserModel)
  public async getUserByEmail(@Args('email', { type: () => String }) email: string): Promise<UserModel> {
    return await this.userService.getUserByEmail(email);
  }
}
