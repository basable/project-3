import type { Filter } from "../types";

interface Props {
  filter: Filter;
  onChange: (f: Filter) => void;
  remaining: number;
  hasCompleted: boolean;
  onClearCompleted: () => void;
}

const FILTERS: Filter[] = ["all", "active", "completed"];

export default function FilterBar({
  filter,
  onChange,
  remaining,
  hasCompleted,
  onClearCompleted,
}: Props) {
  return (
    <footer className="footer">
      <span>
        {remaining} item{remaining === 1 ? "" : "s"} left
      </span>
      <div className="filters">
        {FILTERS.map((f) => (
          <button
            key={f}
            className={f === filter ? "active" : ""}
            onClick={() => onChange(f)}
          >
            {f[0].toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>
      <button
        className="clear"
        onClick={onClearCompleted}
        disabled={!hasCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
}
