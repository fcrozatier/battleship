export default (length) => {
  let hits = 0;

  const hit = () => {
    hits += 1;
  };

  const isSunk = () => hits >= length;

  return {
    isSunk,
    hit,
    hits,
    length,
  };
};
