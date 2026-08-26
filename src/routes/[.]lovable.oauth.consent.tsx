import { createFileRoute, redirect } from "@tanstack/react-router";
import { useState } from "react";

import { supabase } from "@/integrations/supabase/client";

type OAuthClient = { name?: string; client_name?: string; redirect_uri?: string };
type AuthorizationDetails = {
  client?: OAuthClient;
  scope?: string;
  redirect_url?: string;
  redirect_to?: string;
};
type OAuthResult = { data: AuthorizationDetails | null; error: { message: string } | null };
type OAuthApi = {
  getAuthorizationDetails: (id: string) => Promise<OAuthResult>;
  approveAuthorization: (id: string) => Promise<OAuthResult>;
  denyAuthorization: (id: string) => Promise<OAuthResult>;
};

function oauthApi(): OAuthApi {
  return (supabase.auth as unknown as { oauth: OAuthApi }).oauth;
}

export const Route = createFileRoute("/.lovable/oauth/consent")({
  ssr: false,
  validateSearch: (s: Record<string, unknown>) => ({
    authorization_id: typeof s["authorization_id"] === "string" ? s["authorization_id"] : "",
  }),
  beforeLoad: async ({ search, location }) => {
    if (!search.authorization_id) throw new Error("authorization_id ausente");
    const { data } = await supabase.auth.getSession();
    if (!data.session) {
      throw redirect({
        to: "/auth",
        search: { next: location.pathname + location.searchStr },
      });
    }
  },
  loader: async ({ location }) => {
    const authorizationId = new URLSearchParams(location.search).get("authorization_id")!;
    const { data, error } = await oauthApi().getAuthorizationDetails(authorizationId);
    if (error) throw new Error(error.message);
    const immediate = data?.redirect_url ?? data?.redirect_to;
    if (immediate && !data?.client) throw redirect({ href: immediate });
    return data;
  },
  component: Consent,
  errorComponent: ({ error }) => (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <p className="max-w-md text-center text-sm text-muted-foreground">
        Não foi possível carregar este pedido de autorização: {String((error as Error)?.message ?? error)}
      </p>
    </main>
  ),
});

function Consent() {
  const details = Route.useLoaderData();
  const { authorization_id } = Route.useSearch();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clientName = details?.client?.name ?? details?.client?.client_name ?? "o aplicativo";
  const scopes = (details?.scope ?? "").split(" ").filter(Boolean);

  async function decide(approve: boolean) {
    setBusy(true);
    setError(null);
    const api = oauthApi();
    const { data, error: err } = approve
      ? await api.approveAuthorization(authorization_id)
      : await api.denyAuthorization(authorization_id);
    if (err) {
      setBusy(false);
      setError(err.message);
      return;
    }
    const target = data?.redirect_url ?? data?.redirect_to;
    if (!target) {
      setBusy(false);
      setError("O servidor de autorização não retornou um endereço de retorno.");
      return;
    }
    window.location.href = target;
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-16">
      <div className="w-full max-w-md rounded-sm border border-border bg-card p-8">
        <h1 className="text-2xl font-semibold text-foreground">
          Conectar {clientName} à Dom Thiago Barbearia
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          {clientName} poderá usar as ferramentas deste app como você, enquanto você estiver conectado.
        </p>

        {details?.client?.redirect_uri ? (
          <p className="mt-3 break-all text-xs text-muted-foreground">
            Endereço de retorno: {details.client.redirect_uri}
          </p>
        ) : null}

        {scopes.length > 0 ? (
          <ul className="mt-5 space-y-1 text-sm text-foreground">
            {scopes.map((s) => (
              <li key={s}>
                {s === "openid" || s === "profile"
                  ? "Compartilhar seu perfil básico"
                  : s === "email"
                    ? "Compartilhar seu e-mail"
                    : `Permissão adicional solicitada: ${s}`}
              </li>
            ))}
          </ul>
        ) : null}

        <p className="mt-5 text-xs text-muted-foreground">
          Isto não ignora as permissões do app nem as regras de acesso aos dados.
        </p>

        {error ? <p role="alert" className="mt-4 text-sm text-destructive">{error}</p> : null}

        <div className="mt-6 flex gap-3">
          <button
            disabled={busy}
            onClick={() => decide(true)}
            className="flex-1 rounded-sm bg-primary px-4 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground disabled:opacity-60"
          >
            Aprovar
          </button>
          <button
            disabled={busy}
            onClick={() => decide(false)}
            className="flex-1 rounded-sm border border-input px-4 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-foreground disabled:opacity-60"
          >
            Cancelar
          </button>
        </div>
      </div>
    </main>
  );
}
