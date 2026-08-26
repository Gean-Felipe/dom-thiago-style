import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";

function safeNext(value: unknown): string {
  if (typeof value !== "string") return "/";
  if (!value.startsWith("/") || value.startsWith("//")) return "/";
  return value;
}

export const Route = createFileRoute("/auth")({
  ssr: false,
  validateSearch: (s: Record<string, unknown>) => ({ next: safeNext(s["next"]) }),
  head: () => ({
    meta: [
      { title: "Entrar | Dom Thiago Barbearia" },
      {
        name: "description",
        content:
          "Acesse sua conta da Dom Thiago Barbearia para gerenciar suas solicitações de agendamento e da escola de barbeiros.",
      },
      { property: "og:title", content: "Entrar | Dom Thiago Barbearia" },
      {
        property: "og:description",
        content: "Acesse sua conta da Dom Thiago Barbearia em Várzea Grande–MT.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const { next } = Route.useSearch();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void supabase.auth.getSession().then(({ data }) => {
      if (data.session) window.location.href = next;
    });
  }, [next]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    setMessage(null);

    if (mode === "signup") {
      const { data, error: err } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: `${window.location.origin}${next}` },
      });
      setBusy(false);
      if (err) return setError(err.message);
      if (!data.session) return setMessage("Enviamos um e-mail de confirmação. Confirme para continuar.");
      window.location.href = next;
      return;
    }

    const { error: err } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (err) return setError(err.message);
    window.location.href = next;
  }

  async function handleGoogle() {
    setBusy(true);
    setError(null);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: `${window.location.origin}${next}`,
    });
    if (result.error) {
      setBusy(false);
      setError("Não foi possível entrar com o Google.");
      return;
    }
    if (result.redirected) return;
    window.location.href = next;
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-16">
      <div className="w-full max-w-sm rounded-sm border border-border bg-card p-8">
        <h1 className="text-2xl font-semibold text-foreground">
          {mode === "signin" ? "Entrar" : "Criar conta"}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Acesse para gerenciar suas solicitações da Dom Thiago Barbearia.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="email" className="text-xs uppercase tracking-widest text-muted-foreground">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-sm border border-input bg-background px-3 py-2 text-sm text-foreground"
            />
          </div>
          <div>
            <label htmlFor="password" className="text-xs uppercase tracking-widest text-muted-foreground">
              Senha
            </label>
            <input
              id="password"
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-sm border border-input bg-background px-3 py-2 text-sm text-foreground"
            />
          </div>

          {error ? <p role="alert" className="text-sm text-destructive">{error}</p> : null}
          {message ? <p className="text-sm text-muted-foreground">{message}</p> : null}

          <button
            type="submit"
            disabled={busy}
            className="w-full rounded-sm bg-primary px-4 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground disabled:opacity-60"
          >
            {mode === "signin" ? "Entrar" : "Criar conta"}
          </button>
        </form>

        <button
          type="button"
          onClick={handleGoogle}
          disabled={busy}
          className="mt-3 w-full rounded-sm border border-primary/60 px-4 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary disabled:opacity-60"
        >
          Continuar com Google
        </button>

        <button
          type="button"
          onClick={() => {
            setMode(mode === "signin" ? "signup" : "signin");
            setError(null);
            setMessage(null);
          }}
          className="mt-6 w-full text-center text-sm text-muted-foreground underline"
        >
          {mode === "signin" ? "Não tem conta? Criar conta" : "Já tem conta? Entrar"}
        </button>

        <button
          type="button"
          onClick={() => navigate({ to: "/" })}
          className="mt-3 w-full text-center text-xs uppercase tracking-widest text-muted-foreground"
        >
          Voltar ao site
        </button>
      </div>
    </main>
  );
}
