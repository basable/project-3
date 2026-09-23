import { useState } from "react";
import { useTodos } from "./hooks/useTodos";
import type { Filter } from "./types";
import TodoInput from "./components/TodoInput";
import TodoItem from "./components/TodoItem";
import FilterBar from "./components/FilterBar";

export default function App() {
  const { todos, add, toggle, edit, remove, clearCompleted, toggleAll } =
    useTodos();
  const [filter, setFilter] = useState<Filter>("all");

  const visible = todos.filter((t) =>
    filter === "all" ? true : filter === "active" ? !t.done : t.done,
  );
  const remaining = todos.filter((t) => !t.done).length;

  return (
    <main className="app">
      <h1>Todos</h1>
      <section className="card">
        <TodoInput
          onAdd={add}
          onToggleAll={toggleAll}
          hasTodos={todos.length > 0}
        />
        <ul className="list">
          {visible.map((t) => (
            <TodoItem
              key={t.id}
              todo={t}
              onToggle={toggle}
              onEdit={edit}
              onRemove={remove}
            />
          ))}
        </ul>
        {visible.length === 0 && (
          <p className="empty">
            {todos.length === 0 ? "Nothing to do yet — add a task above." : "No tasks here."}
          </p>
        )}
        {todos.length > 0 && (
          <FilterBar
            filter={filter}
            onChange={setFilter}
            remaining={remaining}
            hasCompleted={todos.length > remaining}
            onClearCompleted={clearCompleted}
          />
        )}
      </section>
      <p className="hint">Double-click a task to edit it.</p>
    </main>
  );
}
