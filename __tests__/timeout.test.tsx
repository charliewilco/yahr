import * as React from "react";
import { renderHook, cleanup, act } from "react-hooks-testing-library";
import useTimeout from "../src/useTimeout";

jest.useFakeTimers();

describe("Timeout", () => {
  it("render hook", () => {
    const mock = jest.fn();
    renderHook(() => useTimeout(5000, mock));
    expect(mock).toBeCalled();
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);
  });
});
