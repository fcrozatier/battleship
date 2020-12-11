import { GiNuclearBomb } from "react-icons/gi";

function Cell({ value, hit, own, onClick }) {
  const base = hit ? "cell hit" : "cell";
  const style = value && (own || hit) ? `${base} ship` : base; // show ship background except when not mine and not hit

  return (
    <div className={style} onClick={onClick}>
      {hit && <GiNuclearBomb />}
    </div>
  );
}

export default Cell;
