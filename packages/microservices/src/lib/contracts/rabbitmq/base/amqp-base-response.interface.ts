import { MicroserviceBaseError } from '../../../errors';
import { AmqpBaseRequest } from './amqp-base-request.interface';

export interface AmqpBaseResponse<T = unknown> extends AmqpBaseRequest<T> {
  error?: MicroserviceBaseError;
}
