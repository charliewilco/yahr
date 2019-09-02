import * as React from "react";

function tryDecode(s: string): string {
  try {
    return decodeURIComponent(s);
  } catch (e) {
    return s;
  }
}

const pairSplitRegExp: RegExp = /; */;

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
  return JSON.parse(JSON.stringify([...map]));
}

export function useCookies(key: string) {
  const [state, setState] = React.useState("");
  function setCookie() {}

  function getAllCookies() {}
}
