import { TokensDto } from '@bookstore-nx/entities';
import { BadRequestError, MicroserviceBaseError } from '@bookstore-nx/microservices';
import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { UserAggregate } from '../../../../user/domain/user.aggregate';
import { UserRepository } from '../../../../user/providers/user.repository';
import { LoginCommand } from '../login/login.command';
import { RegisterCommand } from './register.command';
import { CreateUserCommand } from '../../../../user/application-services';

@CommandHandler(RegisterCommand)
export class RegisterCommandHandler implements ICommandHandler<RegisterCommand, TokensDto> {
  public constructor(
    private readonly commandBus: CommandBus,
    private readonly userRepository: UserRepository,
  ) {}

  public async execute({ payload }: RegisterCommand): Promise<TokensDto> {
    const { email, password, fingerprint } = payload;

    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new MicroserviceBaseError(`User with email ${email} already exists.`, 'EMAIL_EXISTS', 400);
    }

    const userAggregate = UserAggregate.create({ email });
    await this.commandBus.execute(new CreateUserCommand({ ...userAggregate, password }));

    return await this.commandBus.execute(new LoginCommand({ email, password, fingerprint }));
  }
}
