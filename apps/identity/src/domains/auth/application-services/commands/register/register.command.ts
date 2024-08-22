import { LoginDto } from '../../../domain/dto/login.dto';

export class RegisterCommand {
  public constructor(public readonly payload: LoginDto) {}
}
