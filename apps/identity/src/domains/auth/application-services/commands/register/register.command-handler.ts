import { TokensDto } from '@bookstore-nx/entities';
import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { UserAggregate } from '../../../../user/domain/user.aggregate';
import { UserRepository } from '../../../../user/providers/user.repository';
import { LoginCommand } from '../login/login.command';
import { RegisterCommand } from './register.command';

@CommandHandler(RegisterCommand)
export class RegisterCommandHandler implements ICommandHandler<RegisterCommand, TokensDto> {
  public constructor(
    private readonly commandBus: CommandBus,
    private readonly userRepository: UserRepository,
  ) {}

  public async execute({ payload: { email, password, fingerprint } }: RegisterCommand): Promise<TokensDto> {
    const existingUser = await this.userRepository.findByEmail(email);

    if (existingUser) {
      throw new Error(`User with email ${email} already exists.`);
    }

    const userAggregate = UserAggregate.create({ email });
    await this.userRepository.create({ ...userAggregate, password });

    return await this.commandBus.execute(new LoginCommand({ email, password, fingerprint }));
  }
}
