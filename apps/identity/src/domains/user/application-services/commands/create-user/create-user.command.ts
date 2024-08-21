import { CreateUserDto } from '../../../domain/dto/create-user.dto';

export class CreateUserCommand {
  public constructor(public readonly user: CreateUserDto) {}
}
