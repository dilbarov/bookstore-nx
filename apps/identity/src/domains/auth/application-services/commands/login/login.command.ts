import { LoginDto } from '@bookstore-nx/entities';

export class LoginCommand {
  public constructor(public readonly payload: LoginDto) {}
}
