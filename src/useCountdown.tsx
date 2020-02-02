import * as React from "react";

export default function useCountdown(
  initialCount: number,
  interval: number = 1000,
  stop = 0,
  decrementValue: number = 1
) {
  const [count, setCount] = React.useState<number>(initialCount);
  React.useEffect(() => {
    let int = setInterval(() => {
      setCount(prev => prev - decrementValue);
    }, interval);
    if (count === stop) {
      clearInterval(int);
    }

    return function cleanup() {
      clearInterval(int);
    };
  }, [count]);
}
