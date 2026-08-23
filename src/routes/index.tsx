import { createFileRoute } from "@tanstack/react-router";
import {
  Scissors,
  Sparkles,
  MapPin,
  Instagram,
  MessageCircle,
  GraduationCap,
  Star,
  Award,
  Flame,
  Clock,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Header } from "@/components/site/Header";
import { Gallery } from "@/components/site/Gallery";
import {
  Cta,
  Reveal,
  SectionTitle,
  WHATSAPP_CLIENTE,
  WHATSAPP_ESCOLA,
  ENDERECO,
  MAPS_URL,
  MAPS_EMBED,
  INSTAGRAM,
} from "@/components/site/primitives";

import heroImg from "@/assets/hero.jpg";
import toalhaImg from "@/assets/toalha.jpg";
import escolaImg from "@/assets/escola.jpg";
import ambienteImg from "@/assets/ambiente.jpg";
import coloracaoImg from "@/assets/coloracao.jpg";
import laminaImg from "@/assets/lamina.jpg";
import barbaImg from "@/assets/barba.jpg";
import alisamentoImg from "@/assets/alisamento.jpg";

const TITLE = "Dom Thiago Barbearia | Barbearia e Escola de Barbeiros em Várzea Grande";
const DESC =
  "Dom Thiago Barbearia em Várzea Grande–MT. Cortes, barba, barbeado com lâmina e toalha quente. Conheça também nossa Escola de Formação de Novos Barbeiros.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      {
        name: "keywords",
        content:
          "barbearia em Várzea Grande, barbearia Paiaguás, barbeiro Várzea Grande, corte masculino Várzea Grande, barba Várzea Grande, escola de barbeiros Várzea Grande, curso de barbeiro Várzea Grande",
      },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

const SERVICOS = [
  {
    nome: "Coloração capilar",
    desc: "Cor aplicada com técnica e acabamento natural, respeitando o seu tipo de fio.",
    img: coloracaoImg,
  },
  {
    nome: "Alisamento capilar",
    desc: "Fios alinhados, com controle de volume e visual mais leve no dia a dia.",
    img: alisamentoImg,
  },
  {
    nome: "Corte de barba",
    desc: "Desenho, simetria e ajuste do contorno de acordo com o seu rosto.",
    img: barbaImg,
  },
  {
    nome: "Extensões de cabelo",
    desc: "Aplicação cuidadosa para dar comprimento e volume com aparência natural.",
    img: heroImg,
  },
  {
    nome: "Barbeado",
    desc: "Acabamento limpo e preciso para uma pele lisa e confortável.",
    img: laminaImg,
  },
  {
    nome: "Barbeado com lâmina",
    desc: "O clássico feito à mão livre, com rigor de técnica em cada movimento.",
    img: laminaImg,
  },
  {
    nome: "Barbeado com toalha quente",
    desc: "Ritual completo: calor, relaxamento e um barbeado impecável.",
    img: toalhaImg,
  },
];

const GALERIA = [
  { src: heroImg, alt: "Barbeiro finalizando corte masculino", cat: "Cortes" },
  { src: coloracaoImg, alt: "Coloração capilar masculina", cat: "Cortes" },
  { src: alisamentoImg, alt: "Cabelo masculino alinhado após alisamento", cat: "Cortes" },
  { src: barbaImg, alt: "Barba sendo desenhada com tesoura", cat: "Barbas" },
  { src: laminaImg, alt: "Barbeado com lâmina", cat: "Barbas" },
  { src: toalhaImg, alt: "Ritual de toalha quente", cat: "Barbas" },
  { src: ambienteImg, alt: "Ambiente da Dom Thiago Barbearia", cat: "Ambiente" },
  { src: escolaImg, alt: "Aluno praticando na escola de formação", cat: "Formação" },
];

const DIFERENCIAIS = [
  { icon: Sparkles, titulo: "Estilo", texto: "Visual pensado para combinar com você, não com uma moda passageira." },
  { icon: Star, titulo: "Experiência", texto: "Atendimento em um ambiente pensado para o seu conforto." },
  { icon: Scissors, titulo: "Técnica", texto: "Cortes, barba e acabamentos feitos com precisão." },
  { icon: GraduationCap, titulo: "Formação profissional", texto: "Escola de formação de novos barbeiros dentro da barbearia." },
];

const FAQ = [
  {
    q: "Quais serviços a Dom Thiago Barbearia oferece?",
    a: "Coloração capilar, alisamento capilar, corte de barba, extensões de cabelo, barbeado, barbeado com lâmina e barbeado com toalha quente.",
  },
  {
    q: "Como faço para agendar um horário?",
    a: "O agendamento é feito pelo WhatsApp (65) 98474-1270. Basta clicar em qualquer botão de agendamento do site e enviar sua mensagem.",
  },
  {
    q: "O que é o barbeado com toalha quente?",
    a: "É o barbeado clássico com aplicação de toalha quente antes do procedimento, deixando o momento mais confortável e o acabamento mais suave.",
  },
  {
    q: "Como funciona a Escola de Formação de Novos Barbeiros?",
    a: "A escola é voltada para quem quer aprender e desenvolver a profissão de barbeiro. Para informações detalhadas, fale com a gente pelo WhatsApp.",
  },
  {
    q: "Onde a barbearia fica localizada?",
    a: `${ENDERECO}. O botão \u201cComo chegar\u201d abre a rota direto no mapa.`,
  },
];

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main>
        {/* HERO */}
        <section id="inicio" className="relative flex min-h-[100svh] items-center overflow-hidden">
          <img
            src={heroImg}
            alt="Barbeiro atendendo cliente na Dom Thiago Barbearia em Várzea Grande"
            width={1600}
            height={1104}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/40" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />

          <div className="relative mx-auto w-full max-w-7xl px-5 pb-28 pt-32 lg:px-8">
            <Reveal className="max-w-2xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-primary">
                Várzea Grande – MT · Paiaguás
              </p>
              <h1 className="mt-6 text-4xl font-semibold leading-[1.1] sm:text-6xl">
                Seu estilo começa <span className="text-gradient-gold">na cadeira.</span>
              </h1>
              <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-lg">
                Cortes, barba e cuidados masculinos em um ambiente onde técnica, estilo e
                experiência se encontram.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Cta href={WHATSAPP_CLIENTE}>Agendar meu horário</Cta>
                <Cta href="#barbearia" variant="outline">
                  Conhecer a barbearia
                </Cta>
              </div>
              <p className="mt-10 inline-flex items-center gap-3 border-l-2 border-primary pl-4 text-xs uppercase tracking-[0.2em] text-foreground/90">
                <Award size={16} className="text-primary" />
                Barbearia + Escola de Formação de Novos Barbeiros
              </p>
            </Reveal>
          </div>
        </section>

        {/* DUAS JORNADAS */}
        <section className="border-y border-primary/15 bg-ink-soft py-16 sm:py-20">
          <div className="mx-auto grid max-w-6xl gap-6 px-5 md:grid-cols-2 lg:px-8">
            <Reveal>
              <article className="surface-card flex h-full flex-col rounded-sm p-8">
                <Scissors className="text-primary" size={28} />
                <h2 className="mt-6 text-2xl font-semibold">Para clientes</h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  “Seu visual merece atenção aos detalhes.”
                </p>
                <Cta href={WHATSAPP_CLIENTE} className="mt-7 w-full sm:w-auto">
                  Agendar meu horário
                </Cta>
              </article>
            </Reveal>
            <Reveal delay={120}>
              <article className="surface-card flex h-full flex-col rounded-sm p-8">
                <GraduationCap className="text-primary" size={28} />
                <h2 className="mt-6 text-2xl font-semibold">Para futuros barbeiros</h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  “Transforme habilidade em profissão.”
                </p>
                <Cta href="#escola" variant="outline" className="mt-7 w-full sm:w-auto">
                  Conhecer a escola
                </Cta>
              </article>
            </Reveal>
          </div>
        </section>

        {/* SOBRE */}
        <section id="barbearia" className="py-20 sm:py-28">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-2 lg:px-8">
            <Reveal>
              <div className="relative">
                <img
                  src={ambienteImg}
                  alt="Ambiente da Dom Thiago Barbearia com cadeiras clássicas e iluminação quente"
                  loading="lazy"
                  width={1408}
                  height={1008}
                  className="rounded-sm border border-primary/20 object-cover"
                />
                <div className="absolute -bottom-5 -right-3 hidden rounded-sm bg-primary px-6 py-4 text-primary-foreground sm:block">
                  <span className="font-display text-sm tracking-[0.2em]">DOM THIAGO</span>
                </div>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <SectionTitle
                eyebrow="Sobre"
                centered={false}
                title="Mais do que uma barbearia. Uma experiência."
                subtitle="Aqui cada atendimento começa pela escuta e termina no detalhe: corte, barba e acabamento feitos com técnica e cuidado. O mesmo padrão guia a nossa Escola de Formação de Novos Barbeiros, onde quem quer viver da profissão aprende na prática, dentro de uma barbearia de verdade."
              />
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Cta href={WHATSAPP_CLIENTE}>Agendar meu horário</Cta>
                <Cta href="#servicos" variant="outline">
                  Ver serviços
                </Cta>
              </div>
            </Reveal>
          </div>
        </section>

        {/* SERVIÇOS */}
        <section id="servicos" className="bg-ink-soft py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <Reveal>
              <SectionTitle
                eyebrow="Serviços"
                title="Cuidado masculino do começo ao acabamento"
                subtitle="Escolha o serviço e agende pelo WhatsApp."
              />
            </Reveal>
            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {SERVICOS.map((s, i) => (
                <Reveal key={s.nome} delay={i * 70}>
                  <article className="surface-card group flex h-full flex-col overflow-hidden rounded-sm">
                    <img
                      src={s.img}
                      alt={s.nome}
                      loading="lazy"
                      className="h-48 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="text-lg font-semibold text-foreground">{s.nome}</h3>
                      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                        {s.desc}
                      </p>
                      <a
                        href={WHATSAPP_CLIENTE}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-6 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary transition-colors hover:text-accent"
                      >
                        Agendar <span aria-hidden>→</span>
                      </a>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* EXPERIÊNCIA TOALHA QUENTE */}
        <section className="relative overflow-hidden py-24">
          <img
            src={toalhaImg}
            alt="Ritual de barbeado com toalha quente"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-ink/80" />
          <div className="relative mx-auto max-w-3xl px-5 text-center lg:px-8">
            <Reveal>
              <Flame className="mx-auto text-primary" size={30} />
              <h2 className="mt-6 text-3xl font-semibold sm:text-5xl">
                O clássico que <span className="text-gradient-gold">nunca sai de moda.</span>
              </h2>
              <p className="mt-6 text-sm leading-relaxed text-muted-foreground sm:text-lg">
                “Barba bem feita, toalha quente e aquele momento para desacelerar.”
              </p>
              <Cta href={WHATSAPP_CLIENTE} className="mt-9">
                Agendar pelo WhatsApp
              </Cta>
            </Reveal>
          </div>
        </section>

        {/* GALERIA */}
        <section id="galeria" className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <Reveal>
              <SectionTitle eyebrow="Galeria" title="Nosso trabalho e nosso ambiente" />
            </Reveal>
            <Gallery items={GALERIA} />
          </div>
        </section>

        {/* ESCOLA */}
        <section id="escola" className="border-y border-primary/15 bg-ink-soft py-20 sm:py-28">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-2 lg:px-8">
            <Reveal>
              <SectionTitle
                eyebrow="Escola"
                centered={false}
                title="Aprenda. Pratique. Evolua."
                subtitle="Escola de Formação de Novos Barbeiros Dom Thiago — um espaço para quem quer aprender a profissão na prática, desenvolver técnica e crescer dentro do universo da barbearia. Fale com a gente para saber como participar."
              />
              <Cta href={WHATSAPP_ESCOLA} className="mt-8">
                Quero ser barbeiro
              </Cta>
            </Reveal>
            <Reveal delay={120}>
              <img
                src={escolaImg}
                alt="Instrutor orientando aluno na Escola de Formação de Novos Barbeiros Dom Thiago"
                loading="lazy"
                width={1408}
                height={1008}
                className="rounded-sm border border-primary/20 object-cover"
              />
            </Reveal>
          </div>
        </section>

        {/* DIFERENCIAIS */}
        <section className="py-20 sm:py-24">
          <div className="mx-auto max-w-6xl px-5 lg:px-8">
            <Reveal>
              <SectionTitle eyebrow="Diferenciais" title="O que sustenta o nosso trabalho" />
            </Reveal>
            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {DIFERENCIAIS.map((d, i) => (
                <Reveal key={d.titulo} delay={i * 80}>
                  <div className="surface-card h-full rounded-sm p-7 text-center">
                    <d.icon className="mx-auto text-primary" size={26} />
                    <h3 className="mt-5 text-base font-semibold uppercase tracking-[0.16em]">
                      {d.titulo}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{d.texto}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* AVALIAÇÕES */}
        <section id="avaliacoes" className="bg-ink-soft py-20 sm:py-24">
          <div className="mx-auto max-w-3xl px-5 text-center lg:px-8">
            <Reveal>
              <SectionTitle
                eyebrow="Avaliações"
                title="O que dizem no Google"
                subtitle="As avaliações da Dom Thiago Barbearia ficam no perfil do Google da barbearia. Leia as opiniões reais de quem já foi atendido e, se você já veio, deixe também a sua."
              />
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Cta
                  href="https://www.google.com/search?q=Dom+Thiago+Barbearia+V%C3%A1rzea+Grande+MT"
                  variant="outline"
                >
                  Ver avaliações no Google
                </Cta>
              </div>
            </Reveal>
          </div>
        </section>

        {/* LOCALIZAÇÃO */}
        <section id="contato" className="py-20 sm:py-28">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 lg:grid-cols-2 lg:px-8">
            <Reveal>
              <SectionTitle eyebrow="Localização" centered={false} title="Onde nos encontrar" />
              <ul className="mt-8 space-y-5 text-sm text-muted-foreground">
                <li className="flex gap-3">
                  <MapPin className="mt-0.5 shrink-0 text-primary" size={18} />
                  <span>{ENDERECO}</span>
                </li>
                <li className="flex gap-3">
                  <MessageCircle className="mt-0.5 shrink-0 text-primary" size={18} />
                  <a href={WHATSAPP_CLIENTE} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                    WhatsApp (65) 98474-1270
                  </a>
                </li>
                <li className="flex gap-3">
                  <Clock className="mt-0.5 shrink-0 text-primary" size={18} />
                  <span>Agende seu horário pelo WhatsApp e confirme a disponibilidade.</span>
                </li>
                <li className="flex gap-3">
                  <Instagram className="mt-0.5 shrink-0 text-primary" size={18} />
                  <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                    @domthiagobarbearia1
                  </a>
                </li>
              </ul>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Cta href={MAPS_URL}>Como chegar</Cta>
                <Cta href={WHATSAPP_CLIENTE} variant="outline">
                  Agendar pelo WhatsApp
                </Cta>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <iframe
                title="Mapa da Dom Thiago Barbearia em Várzea Grande"
                src={MAPS_EMBED}
                loading="lazy"
                className="h-80 w-full rounded-sm border border-primary/20 lg:h-full"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </Reveal>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-ink-soft py-20 sm:py-24">
          <div className="mx-auto max-w-3xl px-5 lg:px-8">
            <Reveal>
              <SectionTitle eyebrow="FAQ" title="Perguntas frequentes" />
              <Accordion type="single" collapsible className="mt-10">
                {FAQ.map((f) => (
                  <AccordionItem key={f.q} value={f.q} className="border-border">
                    <AccordionTrigger className="text-left text-sm font-medium hover:text-primary">
                      {f.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                      {f.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Reveal>
          </div>
        </section>

        {/* INSTAGRAM */}
        <section className="py-20 text-center">
          <div className="mx-auto max-w-3xl px-5 lg:px-8">
            <Reveal>
              <Instagram className="mx-auto text-primary" size={28} />
              <h2 className="mt-5 text-2xl font-semibold sm:text-3xl">@domthiagobarbearia1</h2>
              <p className="mt-4 text-sm text-muted-foreground">
                Acompanhe os cortes, as barbas e os bastidores da barbearia.
              </p>
              <Cta href={INSTAGRAM} variant="outline" className="mt-8">
                Seguir no Instagram
              </Cta>
            </Reveal>
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="relative overflow-hidden border-t border-primary/25 bg-ink py-24">
          <div
            className="absolute inset-0 opacity-20"
            style={{ background: "var(--gradient-gold)" }}
            aria-hidden
          />
          <div className="relative mx-auto max-w-3xl px-5 text-center lg:px-8">
            <Reveal>
              <h2 className="text-3xl font-semibold sm:text-5xl">Pronto para renovar o visual?</h2>
              <p className="mt-5 text-sm text-foreground/90 sm:text-lg">
                Agende seu horário com a Dom Thiago Barbearia.
              </p>
              <Cta href={WHATSAPP_CLIENTE} className="mt-9">
                Agendar pelo WhatsApp
              </Cta>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-ink py-10 pb-28 lg:pb-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-5 text-center text-xs text-muted-foreground lg:px-8">
          <span className="font-display text-sm tracking-[0.25em] text-primary">
            DOM THIAGO BARBEARIA
          </span>
          <p>{ENDERECO}</p>
          <p>Barbearia e Escola de Formação de Novos Barbeiros · (65) 98474-1270</p>
        </div>
      </footer>

      {/* WhatsApp flutuante */}
      <a
        href={WHATSAPP_CLIENTE}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Agendar pelo WhatsApp"
        className="fixed bottom-24 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[var(--shadow-gold)] transition-transform hover:scale-105 lg:bottom-8"
      >
        <MessageCircle size={24} />
      </a>

      {/* Barra fixa mobile */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-primary/30 bg-ink/95 p-3 backdrop-blur lg:hidden">
        <Cta href={WHATSAPP_CLIENTE} className="w-full">
          Agendar meu horário
        </Cta>
      </div>
    </div>
  );
}
