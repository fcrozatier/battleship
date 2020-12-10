export const Ship = (length) => {
  if (length <= 0) throw new Error("a ship must have a positive length");

  let hits = 0;

  const hit = () => {
    hits += 1
  };

  const isSunk = () => {
    return hits === length;
  }

  return {
    isSunk,
    hit,
    hits,
    length,
  };
};
