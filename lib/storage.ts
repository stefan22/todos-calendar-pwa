import type { Todo, User } from "@/types/todo";

const userKey = "todo-calendar-user";
const todosKey = "todo-calendar-todos";

const initialTodos: Todo[] = [
  {
    id: "sample-1",
    title: "Create Hygraph schema",
    description: "Add User and Todo models with ownerEmail for user scoping.",
    status: "IN_PROGRESS",
    priority: "HIGH",
    dueDate: new Date().toISOString().slice(0, 10),
    ownerEmail: "demo@example.com",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "sample-2",
    title: "Run Lighthouse PWA audit",
    description: "Check installability, performance, and accessibility.",
    status: "TODO",
    priority: "MEDIUM",
    dueDate: new Date(Date.now() + 86400000).toISOString().slice(0, 10),
    ownerEmail: "demo@example.com",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(userKey);
  return raw ? (JSON.parse(raw) as User) : null;
}

export function saveCurrentUser(user: User): void {
  window.localStorage.setItem(userKey, JSON.stringify(user));
}

export function clearCurrentUser(): void {
  window.localStorage.removeItem(userKey);
}

export function getTodos(): Todo[] {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(todosKey);
  if (!raw) {
    window.localStorage.setItem(todosKey, JSON.stringify(initialTodos));
    return initialTodos;
  }
  return JSON.parse(raw) as Todo[];
}

export function saveTodos(todos: Todo[]): void {
  window.localStorage.setItem(todosKey, JSON.stringify(todos));
}

export function todosForUser(email: string): Todo[] {
  return getTodos().filter((todo) => todo.ownerEmail === email);
}
