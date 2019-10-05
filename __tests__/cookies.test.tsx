import { parseCookies } from "../src/useCookies";

const MOCK_VALUE = `test1=false; test2=hello`;

describe("cookies", () => {
  it("parses cookies", () => {
    const val: any = parseCookies(MOCK_VALUE);
    expect(val.test1).toBe("false");
    expect(val.test2).toBe("hello");
  });
});
