import Link from "next/link";
import { LogIn } from "lucide-react";
import { Button } from "@/components/Button";

export function AuthLoading() {
  return (
    <main className="grid min-h-screen place-items-center bg-field px-4">
      <div className="rounded-md bg-white p-6 text-center shadow-soft">
        <p className="text-sm font-bold text-ink/65">Checking your session...</p>
      </div>
    </main>
  );
}

export function AuthRequired() {
  return (
    <main className="grid min-h-screen place-items-center bg-field px-4">
      <div className="max-w-sm rounded-md bg-white p-6 text-center shadow-soft">
        <h1 className="text-xl font-black">Sign in required</h1>
        <p className="mt-2 text-sm leading-6 text-ink/65">Sign in to view and manage your TODOs.</p>
        <Link href="/" className="mt-5 inline-flex">
          <Button type="button">
            <LogIn size={18} aria-hidden />
            Sign in
          </Button>
        </Link>
      </div>
    </main>
  );
}
