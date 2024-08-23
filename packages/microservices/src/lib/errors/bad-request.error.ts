import { MicroserviceBaseError } from './microservice-base.error';

export class BadRequestError extends MicroserviceBaseError {
  public constructor(message: string) {
    super(message, 'BAD_REQUEST', 400);
  }
}
