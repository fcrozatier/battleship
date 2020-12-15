import { GiNuclearBomb } from "react-icons/gi";

function Cell({ value, hit, onClick }) {
  const base = hit ? "cell hit" : "cell";
  const style = value ? `${base} ship` : base;

  return (
    <div
      className={style}
      onClick={onClick}
      draggable={value ? true : false}
    >
      {hit && <GiNuclearBomb />}
    </div>
  );
}

export default Cell;
