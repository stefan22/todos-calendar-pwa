import Link from "next/link";
import { useRouter } from "next/router";
import { CalendarDays, CheckSquare, LayoutDashboard, LogOut } from "lucide-react";
import { clearCurrentUser } from "@/lib/storage";
import { Button } from "@/components/Button";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/todos", label: "TODOs", icon: CheckSquare },
  { href: "/calendar", label: "Calendar", icon: CalendarDays }
];

export function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  function handleLogout() {
    clearCurrentUser();
    router.push("/");
  }

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 border-b border-ink/10 bg-field/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link href="/dashboard" className="text-lg font-black tracking-[0] text-pine">
            TODO Calendar
          </Link>
          <nav className="hidden items-center gap-2 md:flex">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = router.pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold ${
                    isActive ? "bg-white text-pine shadow-sm" : "text-ink/75 hover:bg-white"
                  }`}
                >
                  <Icon size={18} aria-hidden />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <Button type="button" variant="ghost" onClick={handleLogout} aria-label="Log out">
            <LogOut size={18} aria-hidden />
            <span className="hidden sm:inline">Log out</span>
          </Button>
        </div>
        <nav className="grid grid-cols-3 border-t border-ink/10 md:hidden">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = router.pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex min-h-[52px] flex-col items-center justify-center gap-1 text-xs font-semibold ${
                  isActive ? "bg-white text-pine" : "text-ink/70"
                }`}
              >
                <Icon size={18} aria-hidden />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-6 md:py-8">{children}</main>
    </div>
  );
}
