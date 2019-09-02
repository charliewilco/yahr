import * as React from "react";

export default function useTimeout(interval: number, cb: Function) {
  React.useEffect(() => {
    const t = setTimeout(() => {
      cb();
    }, interval);

    return function cleanup() {
      clearTimeout(t);
    };
  }, []);
}
