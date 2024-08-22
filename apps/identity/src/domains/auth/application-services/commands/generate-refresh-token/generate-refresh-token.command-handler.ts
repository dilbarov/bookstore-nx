import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';

import { GenerateRefreshTokenCommand } from './generate-refresh-token.command';

@CommandHandler(GenerateRefreshTokenCommand)
export class GenerateRefreshTokenCommandHandler implements ICommandHandler<GenerateRefreshTokenCommand> {
  public constructor(private readonly jwtService: JwtService) {}

  public async execute(command: GenerateRefreshTokenCommand): Promise<string> {
    const { userId } = command;
    const payload = { sub: userId };
    return await this.jwtService.signAsync(payload, { expiresIn: '7d' });
  }
}
