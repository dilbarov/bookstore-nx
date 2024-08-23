import { GenerateTokensCommand } from './generate-tokens.command';
import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TokensDto } from '@bookstore-nx/entities';
import { GenerateAccessTokenCommand } from '../generate-access-token/generate-access-token.command';
import { GenerateRefreshTokenCommand } from '../generate-refresh-token/generate-refresh-token.command';
import { UserRepository } from '../../../../user/providers/user.repository';
import { TokenRepository } from '../../../providers/token.repository';

@CommandHandler(GenerateTokensCommand)
export class GenerateTokensCommandHandler implements ICommandHandler<GenerateTokensCommand, TokensDto> {
  public constructor(
    private readonly commandBus: CommandBus,
    private readonly userRepository: UserRepository,
    private readonly tokenRepository: TokenRepository,
  ) {}

  public async execute({ payload: { fingerprint, id } }: GenerateTokensCommand): Promise<TokensDto> {
    const user = await this.userRepository.findById(id);

    const accessToken = await this.commandBus.execute(new GenerateAccessTokenCommand(user.id, user.email));
    const refreshToken = await this.commandBus.execute(new GenerateRefreshTokenCommand(user.id));

    const accessTokenTTL = 900; // 15 minutes in seconds
    const refreshTokenTTL = 604800; // 7 days in seconds

    await this.tokenRepository.saveAccessToken(user.id, accessToken, fingerprint, accessTokenTTL);
    await this.tokenRepository.saveRefreshToken(user.id, refreshToken, fingerprint, refreshTokenTTL);

    return { accessToken, refreshToken };
  }
}
