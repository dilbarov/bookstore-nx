import { RefreshDto } from '@bookstore-nx/entities';

export class RefreshTokensCommand {
  public constructor(public readonly payload: RefreshDto) {}
}
