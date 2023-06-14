import { generateConfirmationCode } from "../../functions/generateCode.js";
import assert from 'assert';

describe("generateConfirmationCode", () => {
  it("should generate a 6-digit number", () => {
    const result = generateConfirmationCode();

    // Check if the generated code is a number.
    assert.strictEqual(typeof result, "number");

    // Check if the generated code is a 6-digit number.
    assert(result >= 100000);
    assert(result < 1000000);
  });
});
