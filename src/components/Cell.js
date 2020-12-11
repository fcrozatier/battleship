import { GiNuclearBomb } from "react-icons/gi";

function Cell({ value, hit, own, onClick }) {
  const base = value && own ? `cell ship` : "cell";
  const baseHit = hit ? `${base} hit` : base;
  const style = hit && value ? `${baseHit} ship` : base;

  return (
    <div className={style} onClick={onClick}>
      {hit && <GiNuclearBomb />}
    </div>
  );
}

export default Cell;
