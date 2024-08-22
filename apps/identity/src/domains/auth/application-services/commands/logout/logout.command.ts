import { LogoutDto } from '../../../domain/dto/logout.dto';

export class LogoutCommand {
  public constructor(public readonly payload: LogoutDto) {}
}
