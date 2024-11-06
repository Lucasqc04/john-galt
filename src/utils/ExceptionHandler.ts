/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { DefaultResultError, Result } from './Result';

export function ExceptionHandler() {
  return function (
    _target: any,
    _propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      try {
        return await originalMethod.apply(this, args);
      } catch (error) {
        if (
          error instanceof Error &&
          'code' in error &&
          error.code === 'EAI_AGAIN'
        ) {
          return Result.Error({ code: 'NETWORK_ERROR' });
        }

        if (
          error instanceof Error &&
          error.message.includes('O valor [100] é inferior ao limite mínimo')
        ) {
          return Result.Error({ code: 'VALUE_TOO_LOW' });
        }

        if (axios.isAxiosError(error) && error.response?.status === 404) {
          return Result.Error({ code: 'NOT_FOUND' });
        }

        console.error(error);

        return Result.Error({ code: 'UNKNOWN' } as DefaultResultError);
      }
    };

    return descriptor;
  };
}
