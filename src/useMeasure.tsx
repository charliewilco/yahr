import * as React from "react";

interface IMeasureSizes {
  width: number;
  height: number;
}

export default function useMeasure(ref: React.MutableRefObject<HTMLElement>) {
  const [state, setState] = React.useState<IMeasureSizes>(() => {
    if (ref.current !== null) {
      const { width, height } = ref.current.getBoundingClientRect();
      return {
        width,
        height
      };
    } else {
      return {
        width: 0,
        height: 0
      };
    }
  });

  React.useEffect(() => {
    if (ref) {
      const { width, height } = ref.current.getBoundingClientRect();
      console.log(width, height);

      setState({
        width,
        height
      });
    }
  }, [ref.current]);

  return state;
}
