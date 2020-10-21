/* eslint-disable no-undef */
const assert = require("assert");
const Core = require("../core");

const ats = JSON.stringify;

describe("Flatten", () => {

  it("No parameters (undefined)", () => {
    assert.strictEqual(ats(Core.flatten()), ats([]));
  });

  it("Array => Empty", () => {
    assert.strictEqual(ats(Core.flatten([])), ats([]));
  });

  it("Array => [1, 2]", () => {
    assert.strictEqual(ats(Core.flatten([1, 2])), ats([1, 2]));
  });

  it("Array => [1, 2, 3, [4]]", () => {
    assert.strictEqual(ats(Core.flatten([1, 2, 3, [4]])), ats([1, 2, 3, 4]));
  });

  it("Array => [1, [2, [3]], 4]", () => {
    assert.strictEqual(ats(Core.flatten([1, [2, [3]], 4])), ats([1, 2, 3, 4]));
  });

  it("Array => [1, [2], [3, [4]]]", () => {
    assert.strictEqual(ats(Core.flatten([1, [2], [3, [4]]])), ats([1, 2, 3, 4]));
  });

  it("Array => [1, [2], [[[3]], [4]]]", () => {
    assert.strictEqual(ats(Core.flatten([1, [2], [[[3]], [4]]])), ats([1, 2, 3, 4]));
  });

  it("Array => [null, {}, [undefined, [[[4]]]]]", () => {
    assert.strictEqual(ats(Core.flatten([null, {}, [undefined, [[[4]]]]])), ats([null, {}, 4]));
  });

});
