import { getLocalhost } from "./get-localhost";
import Constants from "expo-constants";

describe("getLocalhost", () => {
  it("should return localhost if debuggerHost is not defined", () => {
    const result = getLocalhost();
    expect(result).toBe("localhost");
  });

  it("should return the correct localhost value if debuggerHost is defined", () => {
    const mockDebuggerHost = "http://192.168.0.1:8080";
    jest.spyOn(Constants, "expoConfig", "get").mockReturnValue({
      hostUri: mockDebuggerHost,
    });

    const result = getLocalhost();
    expect(result).toBe("http://192.168.0.1");
  });

  // Add more test cases if needed
});
