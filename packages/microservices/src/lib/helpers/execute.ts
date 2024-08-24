import { AmqpBaseRequest, AmqpBaseResponse } from '../contracts';
import { MicroserviceBaseError } from '../errors';

export const execute = async <TRequest extends AmqpBaseRequest, TResponse extends AmqpBaseResponse>(
  request: TRequest,
  callback: (arg: TRequest['payload']) => Promise<TResponse['payload']>,
) => {
  const { payload: arg, ...rest } = request;
  try {
    const result = await callback(arg);
    return {
      ...rest,
      payload: result,
    };
  } catch (error) {
    console.error(error);
    const _error = error as MicroserviceBaseError;
    return {
      ...rest,
      payload: null,
      error: new MicroserviceBaseError(_error.code, _error.message || JSON.stringify(_error), _error.statusCode),
    };
  }
};
