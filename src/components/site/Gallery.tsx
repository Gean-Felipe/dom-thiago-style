import { useState } from "react";
import { Reveal } from "./primitives";

type Item = { src: string; alt: string; cat: string };

const CATEGORIAS = ["Todos", "Cortes", "Barbas", "Ambiente", "Formação"];

export function Gallery({ items }: { items: Item[] }) {
  const [ativa, setAtiva] = useState("Todos");
  const filtradas = ativa === "Todos" ? items : items.filter((i) => i.cat === ativa);

  return (
    <>
      <div className="mt-10 flex flex-wrap justify-center gap-2">
        {CATEGORIAS.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setAtiva(c)}
            className={`rounded-sm px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] transition-colors ${
              ativa === c
                ? "bg-primary text-primary-foreground"
                : "border border-border text-muted-foreground hover:border-primary/60 hover:text-primary"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtradas.map((item, i) => (
          <Reveal key={item.src + item.cat} delay={i * 60}>
            <figure className="group relative overflow-hidden rounded-sm border border-primary/15">
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                className="h-64 w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink to-transparent p-4 text-[11px] uppercase tracking-[0.2em] text-primary">
                {item.cat}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </>
  );
}
