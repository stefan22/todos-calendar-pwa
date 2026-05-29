import { CheckCircle2, Pencil, Trash2 } from "lucide-react";
import type { Todo } from "@/types/todo";
import { Button } from "@/components/Button";

type TodoListProps = {
  todos: Todo[];
  onEdit: (todo: Todo) => void;
  onDelete: (todoId: string) => void;
};

const statusLabels = {
  TODO: "Todo",
  IN_PROGRESS: "In progress",
  DONE: "Done"
};

const priorityClasses = {
  LOW: "bg-pine/10 text-pine",
  MEDIUM: "bg-marigold/20 text-ink",
  HIGH: "bg-coral/15 text-coral"
};

export function TodoList({ todos, onEdit, onDelete }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className="rounded-md border border-dashed border-ink/25 bg-white p-8 text-center">
        <CheckCircle2 className="mx-auto mb-3 text-pine" size={34} aria-hidden />
        <p className="font-semibold">No TODOs yet.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-3">
      {todos.map((todo) => (
        <article key={todo.id} className="rounded-md bg-white p-4 shadow-soft">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <h3 className="break-words text-base font-bold">{todo.title}</h3>
              {todo.description ? (
                <p className="mt-1 break-words text-sm text-ink/70">{todo.description}</p>
              ) : null}
              <div className="mt-3 flex flex-wrap gap-2 text-xs font-bold">
                <span className="rounded-full bg-field px-3 py-1">{statusLabels[todo.status]}</span>
                <span className={`rounded-full px-3 py-1 ${priorityClasses[todo.priority]}`}>
                  {todo.priority.toLowerCase()}
                </span>
                <span className="rounded-full bg-field px-3 py-1">Due {todo.dueDate}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button type="button" variant="secondary" onClick={() => onEdit(todo)} aria-label="Edit TODO">
                <Pencil size={17} aria-hidden />
              </Button>
              <Button type="button" variant="secondary" onClick={() => onDelete(todo.id)} aria-label="Delete TODO">
                <Trash2 size={17} aria-hidden />
              </Button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
