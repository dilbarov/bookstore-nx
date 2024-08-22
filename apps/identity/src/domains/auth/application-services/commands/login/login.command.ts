import { LoginDto } from '../../../domain/dto/login.dto';

export class LoginCommand {
  public constructor(public readonly payload: LoginDto) {}
}
