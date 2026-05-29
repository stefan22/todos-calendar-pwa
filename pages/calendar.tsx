import { format, getDaysInMonth, parseISO, startOfMonth } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/Button";
import { AuthLoading, AuthRequired } from "@/components/AuthState";
import { Layout } from "@/components/Layout";
import { useAuthGuard } from "@/hooks/useAuth";
import { useUserTodos } from "@/hooks/useUserTodos";

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function CalendarPage() {
  const { user, isReady } = useAuthGuard();
  const { todos } = useUserTodos(user);
  const [monthCursor, setMonthCursor] = useState(() => new Date());

  const monthDays = useMemo(() => {
    const start = startOfMonth(monthCursor);
    const leading = start.getDay();
    const days = getDaysInMonth(monthCursor);
    return [
      ...Array.from({ length: leading }, () => null),
      ...Array.from({ length: days }, (_, index) => {
        const date = new Date(monthCursor.getFullYear(), monthCursor.getMonth(), index + 1);
        return format(date, "yyyy-MM-dd");
      })
    ];
  }, [monthCursor]);

  if (!isReady) return <AuthLoading />;
  if (!user) return <AuthRequired />;

  function moveMonth(amount: number) {
    setMonthCursor(new Date(monthCursor.getFullYear(), monthCursor.getMonth() + amount, 1));
  }

  return (
    <Layout>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-[0]">Calendar</h1>
          <p className="mt-1 text-sm text-ink/65">All TODOs grouped by due date.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button type="button" variant="secondary" onClick={() => moveMonth(-1)} aria-label="Previous month">
            <ChevronLeft size={18} aria-hidden />
          </Button>
          <p className="min-w-[150px] text-center font-black">{format(monthCursor, "MMMM yyyy")}</p>
          <Button type="button" variant="secondary" onClick={() => moveMonth(1)} aria-label="Next month">
            <ChevronRight size={18} aria-hidden />
          </Button>
        </div>
      </div>

      <section className="mt-6 overflow-hidden rounded-md bg-white shadow-soft">
        <div className="grid grid-cols-7 border-b border-ink/10 bg-field text-center text-xs font-black uppercase text-ink/60">
          {weekdays.map((day) => (
            <div key={day} className="py-3">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7">
          {monthDays.map((day, index) => {
            const dayTodos = day ? todos.filter((todo) => todo.dueDate === day) : [];
            return (
              <div key={`${day}-${index}`} className="min-h-[112px] border-b border-r border-ink/10 p-2">
                {day ? (
                  <>
                    <p className="text-sm font-black">{format(parseISO(day), "d")}</p>
                    <div className="mt-2 grid gap-1">
                      {dayTodos.slice(0, 3).map((todo) => (
                        <div key={todo.id} className="truncate rounded bg-pine/10 px-2 py-1 text-xs font-bold text-pine" title={todo.title}>
                          {todo.title}
                        </div>
                      ))}
                      {dayTodos.length > 3 ? <p className="text-xs font-bold text-ink/60">+{dayTodos.length - 3} more</p> : null}
                    </div>
                  </>
                ) : null}
              </div>
            );
          })}
        </div>
      </section>
    </Layout>
  );
}
