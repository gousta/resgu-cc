
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
};
