/* eslint-disable no-undef */
const assert = require("assert");
const Core = require("../core");

const multilineIn = `HELLO
I AM IN TROUBLE`;

const multilineOut = `4|1|1A2|1A2|C
2/1A|B/2|A1/A|1A1|C|2A|A3|1A2|1`;

describe("Resgu Talk", () => {

  it("No parameters (undefined)", () => {
    assert.strictEqual(Core.resguTalk(), null);
  });

  it("Empty parameters", () => {
    assert.strictEqual(Core.resguTalk(""), null);
  });

  it("Text: `HELLO`", () => {
    assert.strictEqual(Core.resguTalk("HELLO"), "4|1|1A2|1A2|C");
  });

  it("Text: `I AM IN TROUBLE`", () => {
    assert.strictEqual(Core.resguTalk("I AM IN TROUBLE"), "2/1A|B/2|A1/A|1A1|C|2A|A3|1A2|1");
  });

  it("Mutiline text", () => {
    assert.strictEqual(Core.resguTalk(multilineIn), multilineOut);
  });

});
