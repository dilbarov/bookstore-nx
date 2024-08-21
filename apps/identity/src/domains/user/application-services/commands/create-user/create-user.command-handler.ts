import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { UserAggregate } from '../../../domain/user.aggregate';
import { UserRepository } from '../../../providers/user.repository';
import { CreateUserCommand } from './create-user.command';

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler
  implements ICommandHandler<CreateUserCommand, UserAggregate>
{
  public constructor(private readonly userRepository: UserRepository) {}

  public async execute({ user }: CreateUserCommand): Promise<UserAggregate> {
    return await this.userRepository.save(UserAggregate.create(user));
  }
}
