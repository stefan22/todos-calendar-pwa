import { useEffect, useMemo, useState } from "react";
import { getTodos, saveTodos, todosForUser } from "@/lib/storage";
import type { Todo, User } from "@/types/todo";

export function useUserTodos(user: User | null) {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    if (user) {
      setTodos(todosForUser(user.email));
    }
  }, [user]);

  function persist(nextTodos: Todo[]) {
    saveTodos(nextTodos);
    if (user) {
      setTodos(nextTodos.filter((todo) => todo.ownerEmail === user.email));
    }
  }

  function addTodo(input: Omit<Todo, "id" | "createdAt" | "updatedAt" | "ownerEmail">) {
    if (!user) return;
    const now = new Date().toISOString();
    const todo: Todo = {
      ...input,
      id: crypto.randomUUID(),
      ownerEmail: user.email,
      createdAt: now,
      updatedAt: now
    };
    persist([todo, ...getTodos()]);
  }

  function updateTodo(todoId: string, input: Omit<Todo, "id" | "createdAt" | "updatedAt" | "ownerEmail">) {
    if (!user) return;
    persist(
      getTodos().map((todo) =>
        todo.id === todoId && todo.ownerEmail === user.email
          ? { ...todo, ...input, updatedAt: new Date().toISOString() }
          : todo
      )
    );
  }

  function deleteTodo(todoId: string) {
    if (!user) return;
    persist(getTodos().filter((todo) => !(todo.id === todoId && todo.ownerEmail === user.email)));
  }

  const stats = useMemo(
    () => ({
      total: todos.length,
      done: todos.filter((todo) => todo.status === "DONE").length,
      inProgress: todos.filter((todo) => todo.status === "IN_PROGRESS").length,
      highPriority: todos.filter((todo) => todo.priority === "HIGH").length
    }),
    [todos]
  );

  return { todos, stats, addTodo, updateTodo, deleteTodo };
}
