import { defineTool } from "@lovable.dev/mcp-js";

export default defineTool({
  name: "informacoes_barbearia",
  title: "Informações da barbearia",
  description:
    "Retorna as informações públicas da Dom Thiago Barbearia 1: endereço, WhatsApp, Instagram e a escola de formação de novos barbeiros.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const info = {
      nome: "Dom Thiago Barbearia 1 e Escola de Formação de Novos Barbeiros",
      endereco: "Rua Antônio Barbosa Ferreira, Paiaguás, Várzea Grande–MT, 78148-596",
      whatsapp: "+55 65 98474-1270",
      instagram: "https://www.instagram.com/domthiagobarbearia1/",
      escola:
        "A barbearia mantém uma Escola de Formação de Novos Barbeiros. Informações sobre turmas, valores e duração são passadas diretamente pelo WhatsApp.",
      observacao:
        "Preços, horários de funcionamento e duração dos cursos não são divulgados no site; confirme pelo WhatsApp.",
    };
    return {
      content: [{ type: "text", text: JSON.stringify(info, null, 2) }],
      structuredContent: info,
    };
  },
});
