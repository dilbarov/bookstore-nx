import { CreateUserDto } from '@bookstore-nx/entities';

export class CreateUserCommand {
  public constructor(public readonly user: CreateUserDto) {}
}
