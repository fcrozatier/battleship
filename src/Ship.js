export const Ship = (length) => {
  if (length < 1) throw new Error("a ship must have a positive length");

  const hits = [];

  const hit = (position) => {
    if (!hits.includes(position) && position < length && position >= 0) {
      hits.push(position);
      isSunk();
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
