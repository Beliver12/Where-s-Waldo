import { expect, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";
window.URL.createObjectURL = function () {
  return "";
};
if (typeof Worker === "undefined") {
  global.Worker = class {
    addEventListener() {}

    removeEventListener() {}

    dispatchEvent() {
      return false;
    }

    onmessage() {}

    onmessageerror() {}

    onerror() {}

    postMessage() {}

    terminate() {}
  };
}
expect.extend(matchers);

afterEach(() => {
  cleanup();
});
