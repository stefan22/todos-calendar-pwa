import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getCurrentUser } from "@/lib/storage";
import type { User } from "@/types/todo";

export function useAuthGuard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      router.replace("/");
      return;
    }
    setUser(currentUser);
    setIsReady(true);
  }, [router]);

  return { user, isReady };
}
