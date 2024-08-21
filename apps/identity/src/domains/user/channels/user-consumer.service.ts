import { Injectable, Logger } from '@nestjs/common';

import { UserFacade } from '../application-services';

@Injectable()
export class UserConsumerService {
  private readonly logger = new Logger(UserConsumerService.name);

  public constructor(private readonly userFacade: UserFacade) {}
}
