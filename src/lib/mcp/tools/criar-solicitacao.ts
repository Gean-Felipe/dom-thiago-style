import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "../supabase";

export default defineTool({
  name: "criar_solicitacao",
  title: "Criar solicitação",
  description:
    "Registra uma solicitação de agendamento na barbearia ou de interesse na escola de formação, vinculada ao usuário conectado. A confirmação final é feita pela barbearia via WhatsApp.",
  inputSchema: {
    tipo: z.enum(["agendamento", "escola"]).describe("Tipo da solicitação."),
    nome: z.string().trim().describe("Nome da pessoa."),
    telefone: z.string().trim().optional().describe("Telefone/WhatsApp para contato."),
    servico: z.string().trim().optional().describe("Serviço desejado (para agendamento)."),
    preferencia: z.string().trim().optional().describe("Data e horário de preferência, em texto livre."),
    observacoes: z.string().trim().optional().describe("Observações adicionais."),
  },
  annotations: { readOnlyHint: false, destructiveHint: false, openWorldHint: false },
  handler: async (input, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Não autenticado." }], isError: true };
    }
    if (!input.nome) {
      return { content: [{ type: "text", text: "O nome é obrigatório." }], isError: true };
    }

    const supabase = supabaseForUser(ctx);
    const { data, error } = await supabase
      .from("solicitacoes")
      .insert({
        user_id: ctx.getUserId(),
        tipo: input.tipo,
        nome: input.nome,
        telefone: input.telefone ?? null,
        servico: input.servico ?? null,
        preferencia: input.preferencia ?? null,
        observacoes: input.observacoes ?? null,
      })
      .select()
      .maybeSingle();

    if (error) {
      return { content: [{ type: "text", text: error.message }], isError: true };
    }
    return {
      content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
      structuredContent: { solicitacao: data },
    };
  },
});
