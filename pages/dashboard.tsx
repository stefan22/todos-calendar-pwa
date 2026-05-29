import Link from "next/link";
import { CalendarDays, ListPlus } from "lucide-react";
import { Button } from "@/components/Button";
import { Layout } from "@/components/Layout";
import { useAuthGuard } from "@/hooks/useAuth";
import { useUserTodos } from "@/hooks/useUserTodos";

export default function DashboardPage() {
  const { user, isReady } = useAuthGuard();
  const { todos, stats } = useUserTodos(user);

  if (!isReady || !user) return null;

  const nextTodos = [...todos].sort((a, b) => a.dueDate.localeCompare(b.dueDate)).slice(0, 4);

  return (
    <Layout>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-bold text-coral">Welcome, {user.name}</p>
          <h1 className="mt-1 text-3xl font-black tracking-[0]">Dashboard</h1>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href="/todos">
            <Button>
              <ListPlus size={18} aria-hidden />
              Add TODO
            </Button>
          </Link>
          <Link href="/calendar">
            <Button variant="secondary">
              <CalendarDays size={18} aria-hidden />
              Calendar
            </Button>
          </Link>
        </div>
      </div>

      <section className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          ["Total", stats.total],
          ["In progress", stats.inProgress],
          ["Done", stats.done],
          ["High priority", stats.highPriority]
        ].map(([label, value]) => (
          <div key={label} className="rounded-md bg-white p-5 shadow-soft">
            <p className="text-sm font-bold text-ink/60">{label}</p>
            <p className="mt-2 text-3xl font-black">{value}</p>
          </div>
        ))}
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-black">Coming up</h2>
        <div className="mt-3 grid gap-3">
          {nextTodos.length ? (
            nextTodos.map((todo) => (
              <div key={todo.id} className="flex flex-col gap-2 rounded-md bg-white p-4 shadow-soft sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-bold">{todo.title}</p>
                  <p className="text-sm text-ink/65">Due {todo.dueDate}</p>
                </div>
                <span className="w-fit rounded-full bg-field px-3 py-1 text-xs font-bold">{todo.status.replace("_", " ")}</span>
              </div>
            ))
          ) : (
            <div className="rounded-md bg-white p-6 text-ink/70 shadow-soft">Your schedule is clear.</div>
          )}
        </div>
      </section>
    </Layout>
  );
}
