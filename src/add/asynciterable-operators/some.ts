import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { some } from '../../asynciterable/some';
import { FindOptions } from '../../asynciterable/findoptions';

/**
 * @ignore
 */
export function someProto<T>(this: AsyncIterable<T>, options: FindOptions<T>): Promise<boolean> {
  return some(this, options as any);
}

AsyncIterableX.prototype.some = someProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    some: typeof someProto;
  }
}
