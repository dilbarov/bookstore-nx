import { TokensDto } from '@bookstore-nx/entities';
import { BadRequestError } from '@bookstore-nx/microservices';
import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { UserRepository } from '../../../../user/providers/user.repository';
import { LoginCommand } from './login.command';
import { GenerateTokensCommand } from '../generate-tokens/generate-tokens.command';

@CommandHandler(LoginCommand)
export class LoginCommandHandler implements ICommandHandler<LoginCommand, TokensDto> {
  public constructor(
    private readonly commandBus: CommandBus,
    private readonly userRepository: UserRepository,
  ) {}

  public async execute({ payload: { email, password, fingerprint } }: LoginCommand): Promise<TokensDto> {
    const user = await this.userRepository.findByEmail(email);
    const isValid = user.validateUserCredentials(password);

    if (!isValid) {
      throw new BadRequestError('Invalid credentials');
    }

    return await this.commandBus.execute(new GenerateTokensCommand({ id: user.id, fingerprint }));
  }
}
