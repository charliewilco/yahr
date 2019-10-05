import * as React from "react";
import { renderHook, act } from "@testing-library/react-hooks";
import useTimeout from "../src/useTimeout";

jest.useFakeTimers();

describe("Timeout", () => {
  it("render hook", () => {
    const mock = jest.fn();
    renderHook(() => useTimeout(5000, mock));
    jest.runAllTimers();
    expect(mock).toBeCalled();
    // expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);
  });
});
