import { IToken, TokensDto } from '@bookstore-nx/entities';
import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';

import { RefreshTokensCommand } from './refresh-tokens.command';
import { TokenRepository } from '../../../providers/token.repository';
import { UserRepository } from '../../../../user/providers/user.repository';
import { GenerateTokensCommand } from '../generate-tokens/generate-tokens.command';
import { BadRequestError } from '@bookstore-nx/microservices';

@CommandHandler(RefreshTokensCommand)
export class RefreshTokensCommandHandler implements ICommandHandler<RefreshTokensCommand, TokensDto> {
  public constructor(
    private readonly commandBus: CommandBus,
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
    private readonly tokenRepository: TokenRepository,
  ) {}

  public async execute({ payload: { refreshToken, fingerprint } }: RefreshTokensCommand): Promise<TokensDto> {
    const decoded = await this.jwtService.verifyAsync<Pick<IToken, 'sub'>>(refreshToken);
    const user = await this.userRepository.findById(decoded.sub);

    if (!user) {
      throw new BadRequestError('Invalid refresh token');
    }

    const existingAccessToken = await this.tokenRepository.getAccessToken(user.id, fingerprint);
    const existingRefreshToken = await this.tokenRepository.getRefreshToken(user.id, fingerprint);

    if (existingAccessToken) {
      await this.tokenRepository.deleteAccessToken(user.id, fingerprint);
    }

    if (existingRefreshToken) {
      await this.tokenRepository.deleteRefreshToken(user.id, fingerprint);
    }

    if (!existingRefreshToken || existingRefreshToken !== refreshToken) {
      throw new BadRequestError('Invalid refresh token');
    }

    return await this.commandBus.execute(new GenerateTokensCommand({ fingerprint, id: user.id }));
  }
}
