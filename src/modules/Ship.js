export default (length, id = Math.random() * 100) => {
  let hits = 0;

  const hit = () => {
    hits += 1;
  };

  const isSunk = () => hits >= length;

  return {
    id,
    isSunk,
    hit,
    hits,
    length,
  };
};
