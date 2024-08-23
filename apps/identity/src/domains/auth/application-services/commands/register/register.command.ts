import { LoginDto } from '@bookstore-nx/entities';

export class RegisterCommand {
  public constructor(public readonly payload: LoginDto) {}
}
