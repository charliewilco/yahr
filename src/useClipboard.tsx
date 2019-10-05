import * as React from "react";
// https://github.com/sudodoki/copy-to-clipboard

export default function useClipboard(item: string) {
  const callBack = React.useCallback(() => navigator.clipboard.writeText(item), [
    item
  ]);

  return callBack;
}
