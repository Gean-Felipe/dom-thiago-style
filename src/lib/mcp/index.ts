import { auth, defineMcp } from "@lovable.dev/mcp-js";
type AnyTool = Parameters<typeof defineMcp>[0]["tools"][number];

import informacoesBarbearia from "./tools/informacoes-barbearia";
import listarServicos from "./tools/listar-servicos";
import criarSolicitacao from "./tools/criar-solicitacao";
import listarSolicitacoes from "./tools/listar-solicitacoes";
import cancelarSolicitacao from "./tools/cancelar-solicitacao";

const projectRef = import.meta.env["VITE_SUPABASE_PROJECT_ID"] ?? "project-ref-unset";

export default defineMcp({
  name: "dom-thiago-style",
  title: "Dom Thiago Style",
  version: "0.1.0",
  instructions:
    "Ferramentas da Dom Thiago Barbearia 1 (Várzea Grande–MT). Use `informacoes_barbearia` e `listar_servicos` para dados públicos, e `criar_solicitacao`, `listar_solicitacoes` e `cancelar_solicitacao` para gerenciar as solicitações do usuário conectado. Nunca invente preços, horários ou duração de cursos.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [
    informacoesBarbearia,
    listarServicos,
    criarSolicitacao,
    listarSolicitacoes,
    cancelarSolicitacao,
  ] as unknown as AnyTool[],
});
