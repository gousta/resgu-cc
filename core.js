const morse = require("./morse.json");

const obfuscate = (letter) => {
  const morseCode = morse[letter];

  if (morseCode) {
    const morseCodeDashesAndDots = morseCode.match(/(-)\1*|(\.)\2*/g);
    const obfuscatedMorseCode = morseCodeDashesAndDots.map((dashOrDot) => {
      if (dashOrDot[0] === ".") return dashOrDot.length;

      return "ABCDEFGHIJKLMNOPQRSTUVWXYZ".charAt(dashOrDot.length - 1);
    }).join("");

    return obfuscatedMorseCode;
  }

  return letter; // if no morse code character was found, return as is.
};

const resguTalk = (raw) => {
  if (!raw) return null;

  const linesMatched = raw.match(/[^\r\n]+/g);
  const lines = linesMatched.map((line) => {
    const inputNormalized = line.toUpperCase().replace(/\s/g, "/");
    const words = inputNormalized.split("/");
    const wordsAndLetters = words.map((word) => word.split(""));
    const final = wordsAndLetters
      .map((word) => word.map(obfuscate).join("|"))
      .join("/");

    return final;
  });

  return lines.join("\n");
};

const flatten = (input) => {
  if (input === undefined) return [];

  if (input instanceof Array) {
    if (input.length === 0) return [];

    return [...flatten(input[0]), ...flatten(input.slice(1))];
  }

  return [input];
};

module.exports = {
  flatten,
  resguTalk,
};
