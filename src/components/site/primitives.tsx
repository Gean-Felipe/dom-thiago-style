import { useEffect, useRef, useState, type ReactNode } from "react";

export const WHATSAPP_CLIENTE =
  "https://wa.me/5565984741270?text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20Dom%20Thiago%20Barbearia%20e%20gostaria%20de%20agendar%20um%20hor%C3%A1rio.";

export const WHATSAPP_ESCOLA =
  "https://wa.me/5565984741270?text=Ol%C3%A1!%20Tenho%20interesse%20na%20Escola%20de%20Forma%C3%A7%C3%A3o%20de%20Novos%20Barbeiros%20da%20Dom%20Thiago%20e%20gostaria%20de%20saber%20mais%20informa%C3%A7%C3%B5es.";

export const ENDERECO =
  "Rua Antônio Barbosa Ferreira, Paiaguás, Várzea Grande–MT, 78148-596";

export const MAPS_URL =
  "https://www.google.com/maps/dir/?api=1&destination=" +
  encodeURIComponent("Rua Antônio Barbosa Ferreira, Paiaguás, Várzea Grande - MT, 78148-596");

export const MAPS_EMBED =
  "https://www.google.com/maps?q=" +
  encodeURIComponent("Rua Antônio Barbosa Ferreira, Paiaguás, Várzea Grande - MT, 78148-596") +
  "&output=embed";

export const INSTAGRAM = "https://www.instagram.com/domthiagobarbearia1/";

export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export function SectionTitle({
  eyebrow,
  title,
  subtitle,
  centered = true,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
}) {
  return (
    <div className={centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">{eyebrow}</p>
      ) : null}
      <h2 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl">{title}</h2>
      <div className={`gold-rule mt-6 ${centered ? "mx-auto" : ""}`} />
      {subtitle ? (
        <p className="mt-5 text-sm leading-relaxed text-muted-foreground sm:text-base">{subtitle}</p>
      ) : null}
    </div>
  );
}

type CtaProps = {
  href: string;
  children: ReactNode;
  variant?: "gold" | "outline";
  className?: string;
};

export function Cta({ href, children, variant = "gold", className = "" }: CtaProps) {
  const base =
    "inline-flex items-center justify-center rounded-sm px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";
  const styles =
    variant === "gold"
      ? "bg-primary text-primary-foreground hover:bg-accent hover:shadow-[var(--shadow-gold)] hover:-translate-y-0.5"
      : "border border-primary/60 text-primary hover:bg-primary hover:text-primary-foreground";
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className={`${base} ${styles} ${className}`}
    >
      {children}
    </a>
  );
}
