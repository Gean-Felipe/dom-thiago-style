import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Cta, WHATSAPP_CLIENTE } from "./primitives";

const LINKS = [
  { href: "#inicio", label: "Início" },
  { href: "#barbearia", label: "Barbearia" },
  { href: "#servicos", label: "Serviços" },
  { href: "#galeria", label: "Galeria" },
  { href: "#escola", label: "Escola" },
  { href: "#avaliacoes", label: "Avaliações" },
  { href: "#contato", label: "Contato" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-ink/95 shadow-lg backdrop-blur border-b border-primary/20" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <a href="#inicio" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-sm border border-primary/60 font-display text-sm text-primary">
            DT
          </span>
          <span className="leading-tight">
            <span className="block font-display text-sm tracking-[0.2em] text-foreground">
              DOM THIAGO
            </span>
            <span className="block text-[10px] uppercase tracking-[0.3em] text-primary">
              Barbearia
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Navegação principal">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-primary"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Cta href={WHATSAPP_CLIENTE} className="px-5 py-3">
            Agendar horário
          </Cta>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          className="rounded-sm border border-primary/40 p-2 text-primary lg:hidden"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-primary/20 bg-ink/98 px-5 pb-6 pt-2 backdrop-blur lg:hidden">
          <nav className="flex flex-col" aria-label="Navegação mobile">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="border-b border-border/60 py-3 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground hover:text-primary"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <Cta href={WHATSAPP_CLIENTE} className="mt-5 w-full">
            Agendar horário
          </Cta>
        </div>
      ) : null}
    </header>
  );
}
