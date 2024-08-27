import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';

import { GenerateAccessTokenCommand } from './generate-access-token.command';

@CommandHandler(GenerateAccessTokenCommand)
export class GenerateAccessTokenCommandHandler implements ICommandHandler<GenerateAccessTokenCommand> {
  public constructor(private readonly jwtService: JwtService) {}

  public async execute(command: GenerateAccessTokenCommand): Promise<string> {
    const { userId, email } = command;
    const payload = { sub: userId, email };
    return await this.jwtService.signAsync(payload, { expiresIn: '1m' });
  }
}
