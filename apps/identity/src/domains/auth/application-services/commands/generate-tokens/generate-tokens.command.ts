import { LogoutDto } from '@bookstore-nx/entities';

export class GenerateTokensCommand {
  public constructor(public readonly payload: LogoutDto) {}
}
