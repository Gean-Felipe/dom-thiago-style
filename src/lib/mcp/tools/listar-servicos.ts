import { defineTool } from "@lovable.dev/mcp-js";

const SERVICOS = [
  { nome: "Coloração capilar", descricao: "Cor aplicada com técnica e acabamento natural, respeitando o tipo de fio." },
  { nome: "Alisamento capilar", descricao: "Fios alinhados, com controle de volume e visual mais leve no dia a dia." },
  { nome: "Corte de barba", descricao: "Desenho, simetria e ajuste do contorno de acordo com o rosto." },
  { nome: "Extensões de cabelo", descricao: "Aplicação cuidadosa para dar comprimento e volume com aparência natural." },
  { nome: "Barbeado", descricao: "Acabamento limpo e preciso para uma pele lisa e confortável." },
  { nome: "Barbeado com lâmina", descricao: "O clássico feito à mão livre, com rigor de técnica em cada movimento." },
  { nome: "Barbeado com toalha quente", descricao: "Ritual completo: calor, relaxamento e um barbeado impecável." },
];

export default defineTool({
  name: "listar_servicos",
  title: "Listar serviços",
  description: "Lista os serviços oferecidos pela Dom Thiago Barbearia. Não inclui preços, que não são divulgados.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(SERVICOS, null, 2) }],
    structuredContent: { servicos: SERVICOS },
  }),
});
