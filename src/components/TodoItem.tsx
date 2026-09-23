import { useState } from "react";
import type { Todo } from "../types";

interface Props {
  todo: Todo;
  onToggle: (id: string) => void;
  onEdit: (id: string, text: string) => void;
  onRemove: (id: string) => void;
}

export default function TodoItem({ todo, onToggle, onEdit, onRemove }: Props) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(todo.text);

  const commit = () => {
    onEdit(todo.id, draft);
    setEditing(false);
  };

  return (
    <li className={`item${todo.done ? " done" : ""}`}>
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => onToggle(todo.id)}
        aria-label={`Mark "${todo.text}" ${todo.done ? "not done" : "done"}`}
      />
      {editing ? (
        <input
          className="edit"
          autoFocus
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={commit}
          onKeyDown={(e) => {
            if (e.key === "Enter") commit();
            if (e.key === "Escape") {
              setDraft(todo.text);
              setEditing(false);
            }
          }}
        />
      ) : (
        <span
          className="text"
          onDoubleClick={() => {
            setDraft(todo.text);
            setEditing(true);
          }}
        >
          {todo.text}
        </span>
      )}
      <button
        className="remove"
        onClick={() => onRemove(todo.id)}
        aria-label={`Delete "${todo.text}"`}
      >
        ×
      </button>
    </li>
  );
}
