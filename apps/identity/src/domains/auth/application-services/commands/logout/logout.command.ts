import { LogoutDto } from '@bookstore-nx/entities';

export class LogoutCommand {
  public constructor(public readonly payload: LogoutDto) {}
}
