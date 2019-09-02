import * as React from "react";

export default function useMedia(query: string): boolean {
  const [matches, setMatch] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (typeof window !== undefined) {
      const val: boolean = window.matchMedia(query).matches;
      setMatch(val);
    }
  }, [query]);

  return matches;
}
