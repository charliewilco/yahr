import * as React from "react";

function tryDecode(s: string): string {
  try {
    return decodeURIComponent(s);
  } catch (e) {
    return s;
  }
}

const pairSplitRegExp: RegExp = /; */;

interface StringTUMap<T, U> {
  [key: string]: U;
}

function fromEntries<T, U>(iterable: Map<T | string, U>): object {
  return [...iterable].reduce(
    (obj: StringTUMap<string, U>, [key, val]: [string, U]) => {
      obj[key] = val;
      return obj;
    },
    {}
  );
}

export function parseCookies(cookies: string): object {
  // this creates the cookie pair
  // ["key=value", "key=value", "key=value", "key=value"]
  const pairs = cookies.split(pairSplitRegExp);

  const map = new Map<string, string>();

  pairs.forEach(element => {
    const [key, value] = element.split("=");

    map.set(tryDecode(key), tryDecode(value));
  });

  // Converts map to object
  return fromEntries(map);
}

export function useCookies(key: string) {
  const [state, setState] = React.useState({});

  React.useEffect(() => {
    const cookies = parseCookies(document.cookie);

    setState(prev => ({ ...prev, ...cookies }));
  }, []);

  function setCookie() {}

  function getAllCookies() {}

  return state;
}
