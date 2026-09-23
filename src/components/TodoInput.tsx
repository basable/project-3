import { useState, type FormEvent } from "react";

interface Props {
  onAdd: (text: string) => void;
  onToggleAll: () => void;
  hasTodos: boolean;
}

export default function TodoInput({ onAdd, onToggleAll, hasTodos }: Props) {
  const [text, setText] = useState("");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    onAdd(text);
    setText("");
  };

  return (
    <form className="input-row" onSubmit={submit}>
      <button
        type="button"
        className="toggle-all"
        onClick={onToggleAll}
        disabled={!hasTodos}
        title="Toggle all"
        aria-label="Toggle all"
      >
        ✓
      </button>
      <input
        autoFocus
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What needs to be done?"
        aria-label="New todo"
      />
      <button type="submit" className="add" disabled={!text.trim()}>
        Add
      </button>
    </form>
  );
}
