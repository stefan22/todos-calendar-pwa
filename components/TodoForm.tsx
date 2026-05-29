import { FormEvent, useState } from "react";
import { Save } from "lucide-react";
import type { Todo, TodoPriority, TodoStatus } from "@/types/todo";
import { Button } from "@/components/Button";

type TodoFormProps = {
  initial?: Todo;
  onSubmit: (todo: Omit<Todo, "id" | "createdAt" | "updatedAt" | "ownerEmail">) => void;
};

export function TodoForm({ initial, onSubmit }: TodoFormProps) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [status, setStatus] = useState<TodoStatus>(initial?.status ?? "TODO");
  const [priority, setPriority] = useState<TodoPriority>(initial?.priority ?? "MEDIUM");
  const [dueDate, setDueDate] = useState(initial?.dueDate ?? new Date().toISOString().slice(0, 10));

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit({ title, description, status, priority, dueDate });
    if (!initial) {
      setTitle("");
      setDescription("");
      setStatus("TODO");
      setPriority("MEDIUM");
      setDueDate(new Date().toISOString().slice(0, 10));
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 rounded-md bg-white p-4 shadow-soft">
      <label className="grid gap-2 text-sm font-semibold">
        Title
        <input
          required
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          className="min-h-[44px] rounded-md border border-ink/15 px-3"
          placeholder="Plan the next task"
        />
      </label>
      <label className="grid gap-2 text-sm font-semibold">
        Description
        <textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          className="min-h-[96px] rounded-md border border-ink/15 px-3 py-2"
          placeholder="Add useful details"
        />
      </label>
      <div className="grid gap-4 sm:grid-cols-2 mb-8">
        <label className="grid gap-2 text-sm font-semibold">
          Status
          <select
            value={status}
            onChange={(event) => setStatus(event.target.value as TodoStatus)}
            className="min-h-[44px] rounded-md border border-ink/15 px-3"
          >
            <option value="TODO">Todo</option>
            <option value="IN_PROGRESS">In progress</option>
            <option value="DONE">Done</option>
          </select>
        </label>
        <label className="grid gap-2 text-sm font-semibold">
          Priority
          <select
            value={priority}
            onChange={(event) => setPriority(event.target.value as TodoPriority)}
            className="min-h-[44px] rounded-md border border-ink/15 px-3"
          >
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>
        </label>
        <label className="grid gap-2 text-sm font-semibold">
          Due date
          <input
            required
            type="date"
            value={dueDate}
            onChange={(event) => setDueDate(event.target.value)}
            className="min-h-[44px] rounded-md border border-ink/15 px-3"
          />
        </label>
      </div>
      <Button type="submit" className="w-full sm:w-fit">
        <Save size={18} aria-hidden />
        {initial ? "Save changes" : "Add TODO"}
      </Button>
    </form>
  );
}
