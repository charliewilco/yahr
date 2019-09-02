import * as React from "react";

export type DebouncedFn = () => void;

export type Procedure = (...args: any[]) => void;

export type Options = {
  isImmediate: boolean;
};

export function debounce<F extends Procedure>(
  func: F,
  waitMilliseconds = 50,
  options: Options = {
    isImmediate: false
  }
): F {
  let timeoutId: NodeJS.Timeout | undefined;

  return function(this: any, ...args: any[]) {
    const context = this;

    const doLater = function() {
      timeoutId = undefined;
      if (!options.isImmediate) {
        func.apply(context, args);
      }
    };

    const shouldCallNow = options.isImmediate && timeoutId === undefined;

    if (timeoutId !== undefined) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(doLater, waitMilliseconds);

    if (shouldCallNow) {
      func.apply(context, args);
    }
  } as any;
}

export default function useDebounceCallback(
  func: Procedure,
  wait: number,
  options: Options = {
    isImmediate: false
  }
) {
  const cb = React.useCallback<() => DebouncedFn>(
    () => debounce(func, wait, options),
    [func, wait]
  );

  return cb;
}
