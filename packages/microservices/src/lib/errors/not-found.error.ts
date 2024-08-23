import { MicroserviceBaseError } from './microservice-base.error';

export class NotFoundError extends MicroserviceBaseError {
  public constructor(message: string) {
    super(message, 'NOT_FOUND', 404);
  }
}
