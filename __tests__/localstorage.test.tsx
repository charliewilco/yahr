import * as React from "react";
import { render, fireEvent, waitForElement } from "@testing-library/react";
import { renderHook, cleanup, act } from "@testing-library/react-hooks";
import "@testing-library/jest-dom/extend-expect";
import storageMock from "./mocks/localstorage";
import useLocalStorage from "../src/useLocalStorage";

// if (!(global as any).localStorage) {
//   (global as any).localStorage = storageMock();
// }

describe("Local storage", () => {
  it("calls something storage", () => {
    const id = "TESTING_ID";
    const Component = () => {
      const [val] = useLocalStorage("value");
      return <span data-testid={id}>{val}</span>;
    };

    const { getByTestId } = render(<Component />);

    expect(getByTestId(id)).toBeInTheDocument();
    expect(getByTestId(id)).toBeEmpty();
  });

  it("sets something into local storage", async () => {
    const id = "TESTING_ID";
    const button_id = "BUTTON_TESTING_ID";
    const input = "Something";

    const Component: React.FC<any> = (): JSX.Element => {
      const [value, setValue] = React.useState("");

      return (
        <div>
          <span data-testid={id}>{value}</span>

          <button data-testid={button_id} onClick={() => setValue(input)}>
            Button
          </button>
        </div>
      );
    };

    const { getByTestId } = render(<Component />);

    const span = getByTestId(id);
    const button = getByTestId(button_id);

    expect(span).toBeInTheDocument();
    expect(span).toHaveTextContent("");
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    await waitForElement(() => span);

    expect(span).toBeInTheDocument();
    expect(span).toHaveTextContent(input);
  });

  it("render hook", () => {
    const VALUE = "SOMETHING";
    const { result } = renderHook(() => useLocalStorage(""));
    expect(result.current[0]).not.toBe(VALUE);
    act(() => result.current[1](VALUE));
    expect(result.current[0]).toBe(VALUE);
    act(() => result.current[2]());
    expect(result.current[0]).toBeFalsy();
  });
});
