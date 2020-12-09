export const Ship = (length) => {
  if (length < 1) throw new Error("a ship must have a positive length");

  const hits = [];

  const hit = (position) => {
    if (!hits.includes(position)) {
      hits.push(position);
    }
  };

  const isSunk = () => {
    return hits.length === length;
  }

  return {
    isSunk,
    hit,
    hits,
    length,
  };
};
