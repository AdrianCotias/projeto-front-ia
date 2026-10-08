"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState, type ReactNode } from "react";

let mocking: Promise<void> | null = null;

// Módulo-level: o StrictMode executa o effect duas vezes e o worker só pode iniciar uma.
function startMocking() {
  mocking ??= import("@/mocks/browser")
    .then(({ worker }) => worker.start({ onUnhandledRequest: "bypass" }))
    .then(() => undefined);
  return mocking;
}

export function Providers({ children }: { children: ReactNode }) {
  const [client] = useState(() => new QueryClient());
  const [ready, setReady] = useState(process.env.NEXT_PUBLIC_API_MOCKING !== "enabled");

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_API_MOCKING !== "enabled") return;
    startMocking().then(() => setReady(true));
  }, []);

  if (!ready) return null;
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
