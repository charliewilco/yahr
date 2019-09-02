import * as React from "react";

type OnToggle = (val?: boolean) => void;

export default function useToggle(defaultVal: boolean): [boolean, OnToggle] {
  const [isOpen, setState] = React.useState(defaultVal || false);

  function onToggle(val?: boolean): void {
    if (val) {
      setState(val);
    } else {
      setState(prev => !prev);
    }
  }

  return [isOpen, onToggle];
}
