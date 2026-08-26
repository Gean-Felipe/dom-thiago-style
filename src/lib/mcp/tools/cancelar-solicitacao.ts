import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "../supabase";

export default defineTool({
  name: "cancelar_solicitacao",
  title: "Cancelar solicitação",
  description: "Cancela (apaga) uma solicitação do usuário conectado, informando o id da solicitação.",
  inputSchema: {
    id: z.string().trim().describe("Id da solicitação a cancelar."),
  },
  annotations: { readOnlyHint: false, destructiveHint: true, openWorldHint: false },
  handler: async ({ id }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Não autenticado." }], isError: true };
    }
    const supabase = supabaseForUser(ctx);
    const { data, error } = await supabase.from("solicitacoes").delete().eq("id", id).select();

    if (error) {
      return { content: [{ type: "text", text: error.message }], isError: true };
    }
    if (!data || data.length === 0) {
      return { content: [{ type: "text", text: "Nenhuma solicitação encontrada com esse id." }], isError: true };
    }
    return { content: [{ type: "text", text: `Solicitação ${id} cancelada.` }] };
  },
});
