import { AmqpBaseRequest, AmqpBaseResponse } from '../contracts';

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
    const _error = error as Error;
    return {
      ...rest,
      payload: null,
      error: {
        code: _error?.message || 'error',
        message: _error?.message || JSON.stringify(_error),
      },
    };
  }
};
