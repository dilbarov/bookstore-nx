import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { TokenRepository } from '../../../providers/token.repository';
import { LogoutCommand } from './logout.command';

@CommandHandler(LogoutCommand)
export class LogoutCommandHandler implements ICommandHandler<LogoutCommand> {
  public constructor(private readonly tokenRepository: TokenRepository) {}

  public async execute({ payload: { fingerprint, id } }: LogoutCommand): Promise<void> {
    await this.tokenRepository.deleteAccessToken(id, fingerprint);
    await this.tokenRepository.deleteRefreshToken(id, fingerprint);
  }
}
