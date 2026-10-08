"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { useLogin } from "./use-login";

export function LoginForm() {
  const router = useRouter();
  const login = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    login.mutate({ email, password }, { onSuccess: () => router.push("/profile") });
  }

  return (
    <form onSubmit={onSubmit}>
      <label>
        E-mail
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </label>
      <label>
        Senha
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
      </label>
      <button type="submit" disabled={login.isPending}>
        {login.isPending ? "Entrando..." : "Entrar"}
      </button>
      {login.isError && <p role="alert">Não foi possível entrar. Verifique suas credenciais.</p>}
    </form>
  );
}
