import { Injectable, Logger } from '@nestjs/common';

import { AuthFacade } from '../application-services';

@Injectable()
export class AuthConsumerService {
  private readonly logger = new Logger(AuthConsumerService.name);

  public constructor(private readonly authFacade: AuthFacade) {}
}
