import { MicroserviceBaseError } from './microservice-base.error';

export class ForbiddenError extends MicroserviceBaseError {
  public constructor(message: string) {
    super(message, 'FORBIDDEN', 403);
  }
}
