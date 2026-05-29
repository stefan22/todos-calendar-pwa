import { useMemo, useState } from "react";
import type { Todo } from "@/types/todo";
import { AuthLoading, AuthRequired } from "@/components/AuthState";
import { Layout } from "@/components/Layout";
import { TodoForm } from "@/components/TodoForm";
import { TodoList } from "@/components/TodoList";
import { useAuthGuard } from "@/hooks/useAuth";
import { useUserTodos } from "@/hooks/useUserTodos";

export default function TodosPage() {
  const { user, isReady } = useAuthGuard();
  const { todos, addTodo, updateTodo, deleteTodo } = useUserTodos(user);
  const [editing, setEditing] = useState<Todo | null>(null);
  const sortedTodos = useMemo(() => [...todos].sort((a, b) => a.dueDate.localeCompare(b.dueDate)), [todos]);

  if (!isReady) return <AuthLoading />;
  if (!user) return <AuthRequired />;

  return (
    <Layout>
      <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
        <section>
          <h1 className="text-3xl font-black tracking-[0]">{editing ? "Update TODO" : "Add TODO"}</h1>
          <div className="mt-4">
            <TodoForm
              key={editing?.id ?? "new"}
              initial={editing ?? undefined}
              onSubmit={(input) => {
                if (editing) {
                  updateTodo(editing.id, input);
                  setEditing(null);
                  return;
                }
                addTodo(input);
              }}
            />
          </div>
        </section>
        <section>
          <h2 className="text-2xl font-black tracking-[0]">Your TODOs</h2>
          <div className="mt-4">
            <TodoList todos={sortedTodos} onEdit={setEditing} onDelete={deleteTodo} />
          </div>
        </section>
      </div>
    </Layout>
  );
}
