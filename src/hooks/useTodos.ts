import { useEffect, useState } from "react";
import type { Todo } from "../types";

const STORAGE_KEY = "todos.v1";

function load(): Todo[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Todo[]) : [];
  } catch {
    return [];
  }
}

function newId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(load);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const add = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setTodos((t) => [
      ...t,
      { id: newId(), text: trimmed, done: false, createdAt: Date.now() },
    ]);
  };

  const toggle = (id: string) =>
    setTodos((t) => t.map((x) => (x.id === id ? { ...x, done: !x.done } : x)));

  const edit = (id: string, text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return remove(id);
    setTodos((t) => t.map((x) => (x.id === id ? { ...x, text: trimmed } : x)));
  };

  const remove = (id: string) => setTodos((t) => t.filter((x) => x.id !== id));

  const clearCompleted = () => setTodos((t) => t.filter((x) => !x.done));

  const toggleAll = () =>
    setTodos((t) => {
      const allDone = t.every((x) => x.done);
      return t.map((x) => ({ ...x, done: !allDone }));
    });

  return { todos, add, toggle, edit, remove, clearCompleted, toggleAll };
}
