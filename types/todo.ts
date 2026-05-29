export type TodoStatus = "TODO" | "IN_PROGRESS" | "DONE";
export type TodoPriority = "LOW" | "MEDIUM" | "HIGH";

export type Todo = {
  id: string;
  title: string;
  description: string;
  status: TodoStatus;
  priority: TodoPriority;
  dueDate: string;
  ownerEmail: string;
  createdAt: string;
  updatedAt: string;
};

export type User = {
  email: string;
  name: string;
};
