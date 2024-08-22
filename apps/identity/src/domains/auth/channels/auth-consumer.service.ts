import { Injectable } from '@nestjs/common';

import { AuthFacade } from '../application-services';

@Injectable()
export class AuthConsumerService {
  public constructor(private readonly authFacade: AuthFacade) {}
}
