import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { LogIn } from "lucide-react";
import { Button } from "@/components/Button";
import { getCurrentUser, saveCurrentUser } from "@/lib/storage";

export default function HomePage() {
  const router = useRouter();
  const [name, setName] = useState("Demo User");
  const [email, setEmail] = useState("demo@example.com");

  useEffect(() => {
    if (getCurrentUser()) {
      router.replace("/dashboard");
    }
  }, [router]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    saveCurrentUser({ name, email: email.toLowerCase().trim() });
    router.push("/dashboard");
  }

  return (
    <main className="min-h-screen bg-field">
      <div className="mx-auto grid min-h-screen max-w-6xl items-center gap-8 px-4 py-10 lg:grid-cols-[1.1fr_0.9fr]">
        <section>
          <p className="mb-3 text-sm font-black uppercase tracking-[0.12em] text-coral">Next.js + GraphQL + PWA</p>
          <h1 className="max-w-3xl text-4xl font-black tracking-[0] text-ink sm:text-5xl">
            TODO Calendar
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-ink/72">
            A responsive TODO workspace with user-owned tasks, calendar planning, Hygraph-ready GraphQL routes, and installable app foundations.
          </p>
        </section>
        <form onSubmit={handleSubmit} className="rounded-md bg-white p-5 shadow-soft">
          <h2 className="text-xl font-black">Sign in</h2>
          <p className="mt-1 text-sm text-ink/65">Local demo auth for now. Swap this for NextAuth or your backend auth when Hygraph is configured.</p>
          <div className="mt-5 grid gap-4">
            <label className="grid gap-2 text-sm font-semibold">
              Name
              <input
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="min-h-[44px] rounded-md border border-ink/15 px-3"
              />
            </label>
            <label className="grid gap-2 text-sm font-semibold">
              Email
              <input
                required
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="min-h-[44px] rounded-md border border-ink/15 px-3"
              />
            </label>
            <Button type="submit">
              <LogIn size={18} aria-hidden />
              Continue
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}
