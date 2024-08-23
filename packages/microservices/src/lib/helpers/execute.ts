import { AmqpBaseRequest, AmqpBaseResponse } from '../contracts';
import { MicroserviceBaseError } from '../errors';

export const execute = async <TArg, TResult>(
  request: AmqpBaseRequest<TArg>,
  callback: (arg: TArg | null) => Promise<TResult>,
): Promise<AmqpBaseResponse<TResult>> => {
  const { payload: arg, ...rest } = request;
  try {
    const result = await callback(arg);
    return {
      ...rest,
      payload: result,
    };
  } catch (error) {
    const _error = error as MicroserviceBaseError;
    return {
      ...rest,
      payload: null,
      error: new MicroserviceBaseError(_error.code, _error.message || JSON.stringify(_error), _error.statusCode),
    };
  }
};
