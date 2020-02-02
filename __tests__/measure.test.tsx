import * as React from "react";
import useMeasure from "../src/useMeasure";
import { render, waitForElement } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

function MockApp() {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const size = useMeasure(ref);

  return (
    <div
      ref={ref}
      style={{
        width: 200,
        height: 200
      }}>
      <span data-testid="WIDTH">{size.width}</span>
      <span data-testid="HEIGHT">{size.height}</span>
    </div>
  );
}

describe("Measure", () => {
  it("renders", async () => {
    const { container, getByTestId, debug } = render(<MockApp />);
    const width = await waitForElement(() => getByTestId("WIDTH"));

    debug();

    expect(container).toBeTruthy();
    expect(width).toHaveTextContent("200");
  });
});
