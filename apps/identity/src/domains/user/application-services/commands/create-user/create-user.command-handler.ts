import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import * as bcrypt from 'bcrypt';

import { UserAggregate } from '../../../domain/user.aggregate';
import { UserRepository } from '../../../providers/user.repository';
import { CreateUserCommand } from './create-user.command';

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler implements ICommandHandler<CreateUserCommand, UserAggregate> {
  public constructor(private readonly userRepository: UserRepository) {}

  public async execute({ user }: CreateUserCommand): Promise<UserAggregate> {
    const _user = UserAggregate.create(user);
    const hashedPassword = await bcrypt.hash(user.password, 10);
    return await this.userRepository.create({ ..._user, password: hashedPassword });
  }
}
