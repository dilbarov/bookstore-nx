import { AmqpBaseRequest } from './amqp-base-request.interface';
import { MicroserviceBaseError } from '../../../errors';

export interface AmqpBaseResponse<T = unknown> extends AmqpBaseRequest<T> {
  error?: MicroserviceBaseError;
}
